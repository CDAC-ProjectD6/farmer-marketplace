import requests

SPRING_BOOT_BASE_URL = "http://localhost:8080"


def normalize_keyword(keyword: str):
    keyword = keyword.strip().lower()

    # Remove common question words/phrases
    prefixes = [
        "do you have ",
        "do you sell ",
        "is there ",
        "are there ",
        "show me ",
        "find ",
        "search for ",
        "search ",
        "available ",
    ]

    for prefix in prefixes:
        if keyword.startswith(prefix):
            keyword = keyword[len(prefix):]
            break

    # Remove punctuation
    keyword = keyword.strip(" .,?!")

    # Handle plural words
    if keyword.endswith("ies"):
        keyword = keyword[:-3] + "y"
    elif keyword.endswith("es"):
        keyword = keyword[:-2]
    elif keyword.endswith("s"):
        keyword = keyword[:-1]

    return keyword.strip()


def search_products(keyword: str):
    keyword = normalize_keyword(keyword)

    print(f"TOOL INPUT AFTER NORMALIZATION: {keyword}")

    url = f"{SPRING_BOOT_BASE_URL}/api/products/search"

    response = requests.get(
        url,
        params={"keyword": keyword},
        timeout=10
    )

    print(f"SPRING RESPONSE: {response.text}")

    response.raise_for_status()

    return response.json()