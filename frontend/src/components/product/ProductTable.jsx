function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-success">

              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Farmer</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th width="170">Actions</th>
              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-4"
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>

                    <td>{product.id}</td>

                    <td>
                      <img
                        src={
                          product.imageUrl
                            ? product.imageUrl
                            : "/images/no-image.png"
                        }
                        alt={product.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>

                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    <td>{product.categoryName}</td>

                    <td>{product.farmerName}</td>

                    <td>
                      ₹ {product.price}
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      {product.active ? (
                        <span className="badge bg-success">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          onDelete(product.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default ProductTable;