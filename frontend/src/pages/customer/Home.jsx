import Button from "../../components/Button/Button";
import CategoryFilter from "../../components/Category/CategoryFilter";

import {useState} from "react";

function Home() {

  const categories = [
    "All",
    "Vegetable",
    "Fruits",
    "Dairy"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <h1>Farmer Marketplace System</h1>
       <Button>Login</Button>

    <Button variant="primary">
        Register
    </Button>

    <Button variant="danger">
        Delete
    </Button>

    <Button disabled>
        Loading...
    </Button>

    <hr/>
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
    </div>
  );
}

export default Home;