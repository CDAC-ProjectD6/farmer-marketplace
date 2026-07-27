import "./Input.css";

function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    error = ""
}) {
    return (
        <div className="input-group-custom">

            {label && (
                <label className="input-label">
                    {label}
                </label>
            )}

            <input
                className={`input-field ${error ? "input-error" : ""}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />

            {error && (
                <small className="error-text">
                    {error}
                </small>
            )}

        </div>
    );
}

export default Input;