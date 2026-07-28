import { useState, useEffect } from "react";

function CategoryModal({ showModal, onClose, onSave , editingCategory}) {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        if(editingCategory){
            setCategoryName(editingCategory.name);
            setDescription(editingCategory.description);
        }else{
            setCategoryName("");
            setDescription("");
        }
    }, [editingCategory])
    const handleSave = ()=>{
        const newCategory ={
        id: editingCategory ? editingCategory.id : null,
        name: categoryName,
        description: description,
        active: editingCategory ? editingCategory.active : true
        };
        onSave(newCategory);
        setCategoryName("");
        setDescription("");
       
    };

    if (!showModal) {
        return null;
    }
    return (
        <div
            className="modal d-block"
            id="categoryModal"
            tabIndex="-1"
            aria-labelledby="categoryModalLabel"
            
        >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="categoryModalLabel"
                        >
                            Add Category
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">

                            <label className="form-label">
                                Category Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Enter description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            ></textarea>
                        </div>

                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"

                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CategoryModal;