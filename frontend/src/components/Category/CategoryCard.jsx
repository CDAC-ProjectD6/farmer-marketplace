import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
    return (
        <div className="category-card">

            <h1>{category.image}</h1>

            <h4>{category.name}</h4>

            <p>{category.description}</p>

            <button
    className="btn btn-success"
    onClick={() => console.log(category.name)}
>
    Browse Products
</button>
        </div>
    );
};

export default CategoryCard;