function CategoryTable({ categories, onEdit, onToggleStatus }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle shadow-sm">
                <thead className="table-success">
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th className="text-center">Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td className="text-center">{category.status === "Active" ? (
                                <span className="badge bg-success">Active</span>) : (
                                <span className="badge bg-danger">Inactive</span>
                            )}
                            </td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(category)}>
                                    Edit
                                </button>

                                <button
                                    className={`btn btn-sm ${category.status === "Active"
                                            ? "btn-danger"
                                            : "btn-success"
                                        }`}
                                    onClick={() => onToggleStatus(category.id)}
                                >
                                    {category.status === "Active"
                                        ? "Deactivate"
                                        : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default CategoryTable;