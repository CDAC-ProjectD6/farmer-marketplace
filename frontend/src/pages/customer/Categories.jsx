import { useEffect, useState } from "react";
import CategoryCard from "../../components/Category/CategoryCard";
import { getActiveCategories } from "../../services/categoryService";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getActiveCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(categories);
console.log(filteredCategories);
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Browse Categories</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="row">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div className="col-md-4 mb-4" key={category.id}>
                            <CategoryCard category={category} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <h5>No categories found.</h5>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Categories;