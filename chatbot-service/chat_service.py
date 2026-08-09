from langchain_core.messages import HumanMessage, ToolMessage

from agent import (
    llm,
    search_marketplace_products,
    search_marketplace_categories,
    search_marketplace_knowledge
)


def chat_with_agent(user_message: str):

    # --------------------------------------------------
    # 1. Decide which type of question the user asked
    # --------------------------------------------------

    routing_prompt = f"""
You are routing a question for the Farmer Marketplace chatbot.

Choose exactly ONE of these options:

PRODUCT

- Use for questions about a specific product.
- Use for product availability, price, stock, brand,
  or whether a product exists.
- Use when asking about a particular product.

CATEGORY

- Use for questions asking about available categories.
- Use for questions such as:
  "What categories are available?"
  "Which categories do you have?"
  "Show me the categories."
  "What product categories are available?"
- Category information must come from the live marketplace
  backend, NOT from the knowledge base.

KNOWLEDGE

- Use for general questions about Farmer Marketplace.
- Use for marketplace features, registration, login,
  shopping cart, purchasing, MarketMate, or how the
  marketplace works.
- Do NOT use KNOWLEDGE for questions asking for the
  current category list.

GENERAL

- Use for greetings or casual conversation.

User question:
{user_message}

Reply with only:
PRODUCT
or
CATEGORY
or
KNOWLEDGE
or
GENERAL
"""

    routing_response = llm.invoke([
        HumanMessage(content=routing_prompt)
    ])

    route = routing_response.content.strip().upper()

    print("\nROUTING DECISION:")
    print(route)

    # --------------------------------------------------
    # 2. General conversation
    # --------------------------------------------------

    if route == "GENERAL":

        response = llm.invoke([
            HumanMessage(
                content=(
                    "You are MarketMate, the AI assistant for "
                    "Farmer Marketplace. "
                    "Be friendly, concise, and helpful.\n\n"
                    f"User message: {user_message}"
                )
            )
        ])

        return response.content

    # --------------------------------------------------
    # 3. Product question
    # --------------------------------------------------

    if route == "PRODUCT":

        result = search_marketplace_products.invoke({
            "keyword": user_message
        })

        print("\nPRODUCT TOOL RESULT:")
        print(result)

        context = str(result)

        final_response = llm.invoke([
            HumanMessage(
                content=(
                    "You are MarketMate, the AI assistant for "
                    "Farmer Marketplace.\n\n"

                    f"User question:\n{user_message}\n\n"

                    f"Live marketplace product information:\n"
                    f"{context}\n\n"

                    "Answer ONLY using the live marketplace "
                    "product information above. "

                    "Do not invent products, prices, stock, "
                    "brands, farmers, or other product details. "

                    "When product information is available, "
                    "always mention the product name, price, "
                    "and available stock. "

                    "Also mention the brand and farmer when "
                    "available. "

                    "Do not omit the price or stock when they "
                    "are present in the live marketplace "
                    "information. "

                    "For prices, use ₹ (INR). "

                    "If the information is empty or does not "
                    "contain the answer, clearly say that the "
                    "requested product information is not "
                    "available."
                )
            )
        ])

        print("\nFINAL LLM RESPONSE:")
        print(final_response)

        return final_response.content

    # --------------------------------------------------
    # 4. Category question
    # --------------------------------------------------

    if route == "CATEGORY":

        result = search_marketplace_categories.invoke({
            "query": user_message
        })

        print("\nCATEGORY TOOL RESULT:")
        print(result)

        context = str(result)

        final_response = llm.invoke([
            HumanMessage(
                content=(
                    "You are MarketMate, the AI assistant for "
                    "Farmer Marketplace.\n\n"

                    f"User question:\n{user_message}\n\n"

                    f"Live marketplace category information:\n"
                    f"{context}\n\n"

                    "Answer ONLY using the live marketplace "
                    "category information above. "

                    "The category information comes directly "
                    "from the Farmer Marketplace backend. "

                    "Do not use the knowledge base to provide "
                    "category names. "

                    "Do not invent or add any categories. "

                    "If no categories are available, clearly "
                    "tell the user that there are currently "
                    "no categories available. "

                    "If the backend information cannot be "
                    "retrieved, clearly tell the user that "
                    "the categories could not be fetched "
                    "right now."
                )
            )
        ])

        print("\nFINAL LLM RESPONSE:")
        print(final_response)

        return final_response.content

    # --------------------------------------------------
    # 5. Marketplace knowledge question
    # --------------------------------------------------

    if route == "KNOWLEDGE":

        result = search_marketplace_knowledge.invoke({
            "query": user_message
        })

        print("\nKNOWLEDGE TOOL RESULT:")
        print(result)

        context = str(result)

        final_response = llm.invoke([
            HumanMessage(
                content=(
                    "You are MarketMate, the AI assistant for "
                    "Farmer Marketplace.\n\n"

                    f"User question:\n{user_message}\n\n"

                    f"Retrieved marketplace knowledge:\n"
                    f"{context}\n\n"

                    "Answer ONLY using the retrieved marketplace "
                    "knowledge above. "

                    "Do not use outside knowledge. "

                    "Do not invent marketplace features, "
                    "policies, buttons, payment methods, "
                    "shipping details, or registration steps. "

                    "If the retrieved knowledge does not contain "
                    "enough information to answer the question, "
                    "clearly say that the available marketplace "
                    "information does not provide those details."
                )
            )
        ])

        print("\nFINAL LLM RESPONSE:")
        print(final_response)

        return final_response.content

    # --------------------------------------------------
    # 6. Fallback
    # --------------------------------------------------

    return (
        "I'm sorry, I couldn't determine how to handle that "
        "question. Please try asking about Farmer Marketplace "
        "or its products."
    )