function CategoryTable({ categories }) {
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
                                <td className="text-center">{category.status === "Active" ?(
                                <span className="badge bg-success">Active</span>) : (
                                    <span className="badge bg-danger">Inactive</span>
                                )}
                                </td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </button>

                                    <button className="btn btn-danger btn-sm">
                                        Delete
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