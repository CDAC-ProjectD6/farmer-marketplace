from pathlib import Path
import re

KNOWLEDGE_FILE = (
    Path(__file__).parent
    / "knowledge"
    / "marketplace_info.txt"
)


# Common words that should NOT affect retrieval
STOP_WORDS = {
    "what",
    "is",
    "are",
    "the",
    "a",
    "an",
    "how",
    "can",
    "do",
    "does",
    "to",
    "of",
    "in",
    "on",
    "for",
    "and",
    "or",
    "with",
    "i",
    "me",
    "my",
    "you",
    "your",
    "about",
    "tell",
    "please",
    "available",
}


def load_knowledge():

    with open(
        KNOWLEDGE_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return file.read()


def normalize_text(text: str):

    text = text.lower()

    text = re.sub(
        r"[^a-z0-9₹]+",
        " ",
        text
    )

    return text.strip()


def get_query_words(query: str):

    normalized_query = normalize_text(query)

    words = normalized_query.split()

    return {
        word
        for word in words
        if word not in STOP_WORDS
        and len(word) > 2
    }


def search_knowledge(query: str):

    knowledge = load_knowledge()

    query_words = get_query_words(query)

    if not query_words:
        return []


    # Split knowledge into paragraphs
    paragraphs = [
        paragraph.strip()
        for paragraph in knowledge.split("\n\n")
        if paragraph.strip()
    ]


    scored_paragraphs = []


    for paragraph in paragraphs:

        paragraph_normalized = normalize_text(
            paragraph
        )

        paragraph_words = set(
            paragraph_normalized.split()
        )


        # Count matching meaningful words
        score = len(
            query_words.intersection(
                paragraph_words
            )
        )


        # Give extra importance to exact phrases
        normalized_query = normalize_text(query)

        if normalized_query in paragraph_normalized:
            score += 5


        if score > 0:

            scored_paragraphs.append(
                (score, paragraph)
            )


    # Highest score first
    scored_paragraphs.sort(
        key=lambda item: item[0],
        reverse=True
    )


    # Return only the best results
    results = [
        paragraph
        for score, paragraph
        in scored_paragraphs[:3]
    ]


    return results