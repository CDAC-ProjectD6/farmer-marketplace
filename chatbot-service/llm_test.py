import os
from langchain_groq import ChatGroq

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError("GROQ_API_KEY environment variable is not set")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0
)

response = llm.invoke(
    "You are a helpful assistant for a Farmer Marketplace. "
    "Introduce yourself in one short sentence."
)

print(response.content)