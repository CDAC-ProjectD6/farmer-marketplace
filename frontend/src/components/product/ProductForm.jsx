import { useEffect, useState } from "react";

function ProductForm({
  categories,
  initialData,
  onSubmit,
  onCancel,
}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    imageUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        brand: initialData.brand || "",
        imageUrl: initialData.imageUrl || "",
        categoryId: initialData.categoryId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      categoryId: Number(product.categoryId),
    });
  };

  return (
    <div className="card shadow">
      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Product Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              rows="3"
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Price
              </label>

              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Stock
              </label>

              <input
                type="number"
                className="form-control"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="mb-3">
            <label className="form-label">
              Brand
            </label>

            <input
              type="text"
              className="form-control"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Image URL
            </label>

            <input
              type="text"
              className="form-control"
              name="imageUrl"
              placeholder="/images/tomato.webp"
              value={product.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2">

            <button
              type="submit"
              className="btn btn-success"
            >
              {initialData
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ProductForm;