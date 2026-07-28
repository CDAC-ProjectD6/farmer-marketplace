import { useEffect, useState } from "react";

function ProductFilter({
  categories,
  onSearch,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    onSearch(keyword);
  }, [keyword]);

  useEffect(() => {
    onCategoryChange(category);
  }, [category]);

  useEffect(() => {
    onPriceChange(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    onSortChange(sort);
  }, [sort]);

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");

    onSearch("");
    onCategoryChange("");
    onPriceChange("", "");
    onSortChange("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <div className="row g-3">

          {/* Search */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Product..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="col-md-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="col-md-2">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-md-1 d-grid">
            <button
              className="btn btn-secondary"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductFilter;