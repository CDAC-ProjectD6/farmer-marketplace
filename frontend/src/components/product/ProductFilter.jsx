import { useEffect, useState } from "react";

function ProductFilter({
  categories,
  onSearch,
  onNameSearch,      // <-- Exact name search prop
  onCategoryChange,
  onPriceChange,
  onStockChange,     // <-- Stock filter prop
  onSortChange,
}) {
  const [keyword, setKeyword] = useState("");
  const [exactName, setExactName] = useState(""); // <-- Exact name state
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stock, setStock] = useState("");         // <-- Stock state
  const [sort, setSort] = useState("");

  useEffect(() => {
    onSearch(keyword);
  }, [keyword]);

  useEffect(() => {
    if (onNameSearch) onNameSearch(exactName);
  }, [exactName]);

  useEffect(() => {
    onCategoryChange(category);
  }, [category]);

  useEffect(() => {
    onPriceChange(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (onStockChange) onStockChange(stock);
  }, [stock]);

  useEffect(() => {
    onSortChange(sort);
  }, [sort]);

  const resetFilters = () => {
    setKeyword("");
    setExactName("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setStock("");
    setSort("");

    onSearch("");
    if (onNameSearch) onNameSearch("");
    onCategoryChange("");
    onPriceChange("", "");
    if (onStockChange) onStockChange("");
    onSortChange("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">

          {/* Keyword Search */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Exact Product Name Search */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Exact product name..."
              value={exactName}
              onChange={(e) => setExactName(e.target.value)}
            />
          </div>

          {/* Category Name Filter */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Stock Level Filter */}
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Sort Option */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="col-md-3 d-grid">
            <button className="btn btn-secondary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductFilter;