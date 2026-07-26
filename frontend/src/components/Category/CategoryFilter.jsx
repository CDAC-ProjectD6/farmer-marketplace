import "./CategoryFilter.css";

function CategoryFilter({categories, selectedCategory, onCategoryChange}){
    return (
        <div className="category-filter">
            <h4 className="mb-3">Categories</h4>

            {categories.map((category)=>(
                <button key = {category} 
                        className={
                            category === selectedCategory
                            ? "category-btn active"
                            :"category-btn"
                        }
                        onClick={()=> onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;