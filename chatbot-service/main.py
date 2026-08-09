from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chat_service import chat_with_agent


app = FastAPI(
    title="Farmer Marketplace AI Assistant"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {
        "message": "Farmer Marketplace AI Assistant is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    answer = chat_with_agent(request.message)

    return {
        "message": request.message,
        "response": answer
    }