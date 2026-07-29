import CategoryCard from "../../components/Category/CategoryCard";
import categories from "../../data/categories";
import { useState } from "react";
const Categories = () => {
  const [search, setSearch] = useState("");
  const filteredCategories = categories.filter(
    (category) =>
        category.active &&
        category.name.toLowerCase().includes(search.toLowerCase())
);
    return (
        <div className="container mt-4">
          

            <h2 className="mb-4">
                <h2 className="mb-4">
    Browse Categories ({filteredCategories.length})
</h2>
            </h2>
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
           <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={category.id}>
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