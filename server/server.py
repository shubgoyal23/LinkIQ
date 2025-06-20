from fastapi import FastAPI, File, Request, UploadFile
from helpers.middleware import JWTMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from server.auth_router import router as auth_router


app = FastAPI()
app.add_middleware(JWTMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],    # List of allowed origins
    allow_credentials=True,                     # Allow cookies / credentials
    allow_methods=["*"],                        # Allow all HTTP methods
    allow_headers=["*"],                        # Allow all headers
)

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

@app.get("/")
def serve_react_app():
    return FileResponse("frontend/dist/index.html")

@app.get("/ping")
def read_root():
    return {"status": "server is up and running", "success": True}

app.include_router(auth_router, prefix="/api/v1/auth")

