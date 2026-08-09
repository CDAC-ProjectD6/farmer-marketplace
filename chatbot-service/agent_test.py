from agent import llm_with_tools


response = llm_with_tools.invoke(
    "Do you have tomatoes available in the Farmer Marketplace?"
)

print("CONTENT:")
print(response.content)

print("\nTOOL CALLS:")
print(response.tool_calls)