from dotenv import load_dotenv
load_dotenv()
from server.server import app
import uvicorn

def main():
    uvicorn.run("server.server:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
    