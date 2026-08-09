from langchain_groq import ChatGroq
from langchain.tools import tool

from product_service import search_products
from knowledge_service import search_knowledge
from category_service import get_categories

from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY")
)


# --------------------------------------------------
# PRODUCT TOOL
# --------------------------------------------------

@tool
def search_marketplace_products(keyword: str):
    """
    Search for products available in the Farmer Marketplace.
    Use this tool when the user asks about available products,
    product prices, stock, or specific products.
    """
    return search_products(keyword)


# --------------------------------------------------
# CATEGORY TOOL
# --------------------------------------------------

@tool
def search_marketplace_categories(query: str):
    """
    Fetch the currently available categories from the
    Farmer Marketplace backend.

    Use this tool when the user asks about available
    categories or product categories.
    """
    return get_categories()


# --------------------------------------------------
# KNOWLEDGE TOOL
# --------------------------------------------------

@tool
def search_marketplace_knowledge(query: str) -> str:
    """
    Search the Farmer Marketplace knowledge base.
    """
    results = search_knowledge(query)

    return "\n\n".join(results)


# --------------------------------------------------
# TOOLS
# --------------------------------------------------

tools = [
    search_marketplace_products,
    search_marketplace_categories,
    search_marketplace_knowledge
]

llm_with_tools = llm.bind_tools(tools)