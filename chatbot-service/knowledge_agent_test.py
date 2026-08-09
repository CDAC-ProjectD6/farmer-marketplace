from langchain_core.messages import HumanMessage

from agent import llm_with_tools


questions = [
    "Do you have tomatoes?",
    "How can customers purchase products?"
]


for question in questions:

    print("\n==============================")
    print("QUESTION:", question)
    print("==============================")

    response = llm_with_tools.invoke(
        [HumanMessage(content=question)]
    )

    print("TOOL CALLS:")
    print(response.tool_calls)