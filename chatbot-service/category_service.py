import requests


# --------------------------------------------------
# Spring Boot Category API
# --------------------------------------------------

CATEGORY_API_URL = "http://localhost:8080/api/categories"


def get_categories():

    try:

        response = requests.get(
            CATEGORY_API_URL,
            timeout=5
        )

        response.raise_for_status()

        categories = response.json()

        print("\nCATEGORY API RESULT:")
        print(categories)

        if not categories:
            return "There are currently no categories available."

        category_names = []

        for category in categories:

            # If backend returns:
            # {
            #     "id": 1,
            #     "name": "Vegetables"
            # }

            if isinstance(category, dict):

                name = (
                    category.get("name")
                    or category.get("categoryName")
                )

                if name:
                    category_names.append(str(name))

            # If backend directly returns:
            # ["Vegetables", "Fruits"]

            elif isinstance(category, str):

                category_names.append(category)

        if not category_names:
            return "There are currently no categories available."

        return (
            "The available categories are: "
            + ", ".join(category_names)
            + "."
        )

    except requests.exceptions.RequestException as e:

        print("\nCATEGORY API ERROR:")
        print(e)

        return (
            "I couldn't fetch the available categories "
            "from the marketplace right now."
        )