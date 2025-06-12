from dotenv import load_dotenv
load_dotenv()
from helpers.server import app
import uvicorn

def main():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
    