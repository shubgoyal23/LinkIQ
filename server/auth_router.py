import os
from fastapi import APIRouter
from fastapi import Request
from fastapi.responses import Response
from fastapi.exceptions import HTTPException
from server.models import LoginRequest, RegisterRequest, LoginGoogleRequest
from helpers.jwt_utils import create_token
from helpers.password_utils import hash_password, verify_password
from datetime import timedelta
from helpers.mongo_connect import mongo_create_one, mongo_find_one
import requests

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest, response: Response):
    if data.password == "" or data.email == "":
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user = mongo_find_one({"email": data.email}, "users")
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if user.get("thirdPartyLogin"):
        raise HTTPException(status_code=401, detail=f"User logged in using {user.get('thirdPartyInfo').get('provider')}")
    
    if not verify_password(data.password, user.get("password")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_token({"sub": user.get("_id")}, timedelta(days=1))

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,  # Should be False for local HTTP (only True in HTTPS)
        samesite="Lax",
        max_age=86400,
        path="/",
    )
    del user["password"]
    return {"message": "Logged in, token set in cookie", "success": True, "data": user}

@router.post("/register")
def register(data: RegisterRequest, response: Response):
    if data.password == "" or data.email == "":
        raise HTTPException(status_code=401, detail="Invalid email or password")
    names = data.name.split(" ")
    if len(names) < 2:
        names.append("")
    created = mongo_create_one({"email": data.email, "password": hash_password(data.password), "firstName": names[0], "lastName": names[1], "plan": "free", "isActive": True, "thirdPartyLogin": False}, "users")
    if str(created).startswith("Error"):
        raise HTTPException(status_code=401, detail="User already exists")
    user = mongo_find_one({"email": data.email}, "users")
    if not user:
        raise HTTPException(status_code=401, detail="Failed to find user")
    del user["password"]
    return {"message": "User registered successfully Login to continue", "success": True, "data": user}

@router.post("/login-google")
def login_google(data: LoginGoogleRequest, response: Response):
    if data.token == "":
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Step 1: Exchange token for access token
    token_url = "https://oauth2.googleapis.com/token"
    token_payload = {
        "code": data.token,
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI"),
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_url, data=token_payload)
    if token_response.status_code != 200:
        raise HTTPException(status_code=403, detail="Invalid token or user not found")

    tokens = token_response.json()
    access_token = tokens.get("access_token")

    if not access_token:
        raise HTTPException(status_code=403, detail="Access token not received")

    # Step 2: Get user info
    user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    user_info_response = requests.get(
        user_info_url,
        headers={"Authorization": f"Bearer {access_token}"}
    )
    if user_info_response.status_code != 200:
        raise HTTPException(status_code=403, detail="Failed to fetch user info")

    payload = user_info_response.json()
    email = payload.get("email")

    if not email:
        raise HTTPException(status_code=403, detail="Email not found in Google response")

    # Step 3: Find or create user
    user_doc = mongo_find_one({"email": email}, "users")
    if str(user_doc).startswith("Error"):
        user_doc = {
            "email": email,
            "firstName": payload.get("given_name"),
            "lastName": payload.get("family_name"),
            "picture": payload.get("picture"),
            "isActive": True,
            "thirdPartyLogin": True,
            "thirdPartyInfo": {
                "provider": "Google",
                "uid": payload.get("id"),
            },
            "password": ""
        }
        created_id = mongo_create_one(user_doc, "users")
        if str(created_id).startswith("Error"):
            raise HTTPException(status_code=401, detail="Something went wrong")
        user_doc["_id"] = str(created_id)
    
    is_third_party = user_doc.get("thirdPartyLogin")
    if not is_third_party:
        raise HTTPException(status_code=401, detail="Login using email and password")

    token = create_token({"sub": user_doc.get("_id")}, timedelta(days=1))
    del user_doc["password"]
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,  # Should be False for local HTTP (only True in HTTPS)
        samesite="Lax",
        max_age=86400,
        path="/",
    )
    return {"message": "Logged in, token set in cookie", "success": True, "data": user_doc}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully", "success": True}

@router.get("/me")
def user(request: Request):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=401, detail="user not logged in")
    return {"message": "User is logged in", "success": True, "data": user}
