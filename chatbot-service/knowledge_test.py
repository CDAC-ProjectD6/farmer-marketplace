from knowledge_service import search_knowledge


question = "How can customers purchase products?"

results = search_knowledge(question)

print("RETRIEVED KNOWLEDGE:")
print()

for result in results:
    print(result)
    print()