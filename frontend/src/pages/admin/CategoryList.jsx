import CategoryTable from "../../components/Category/CategoryTable";
import mockCategories from "../../data/mockCategories";

import { useState } from "react";
function CategoryList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Default");
    const filteredCategories = mockCategories.filter((category) => {
        const matchesSearch = category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || category.status === statusFilter;

        return matchesStatus && matchesSearch;
    });
    const sortedCategories = [...filteredCategories];
    if (sortBy === "Name (A-Z)") {
        sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Name (Z-A)") {
        sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Category Management</h2>

                <button className="btn btn-success">
                    + Add Category
                </button>
            </div>
            {/* <div className="row mb-4 align-items-end">

                <div className="col-md-4">
                    <label className="form-label">
                        Search
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search category..."
                    />
                </div>

            </div> */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label">
                                Search
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search category..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">

                            <label className="form-label">
                                Status
                            </label>
                            <select className="form-select"
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                            >
                                <option>All</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                Sort By
                            </label>

                            <select className="form-select"
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                            >
                                <option>Default</option>
                                <option>Name (A-Z)</option>
                                <option>Name (Z-A)</option>
                            </select>
                        </div>
                    </div>

                </div>

            </div>
            {sortedCategories.length > 0 ? (
                <CategoryTable categories={sortedCategories} />
            ) : (
                <div className="alert alert-info text-center">
                    <h5>No categories found</h5>
                    <p className="mb-0">
                        Try changing your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}

export default CategoryList;