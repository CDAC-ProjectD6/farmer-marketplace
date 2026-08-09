from agent import llm_with_tools, search_marketplace_products
from langchain_core.messages import HumanMessage, ToolMessage


user_message = HumanMessage(
    content="Do you have tomatoes available in the Farmer Marketplace?"
)

messages = [user_message]

# Step 1: Ask the LLM what to do
response = llm_with_tools.invoke(messages)

messages.append(response)

# Step 2: Execute any tools requested by the LLM
for tool_call in response.tool_calls:

    if tool_call["name"] == "search_marketplace_products":

        result = search_marketplace_products.invoke(
            tool_call["args"]
        )

        messages.append(
            ToolMessage(
                content=str(result),
                tool_call_id=tool_call["id"]
            )
        )

# Step 3: Give the tool result back to the LLM
final_response = llm_with_tools.invoke(messages)

print("\nFINAL ANSWER:")
print(final_response.content)