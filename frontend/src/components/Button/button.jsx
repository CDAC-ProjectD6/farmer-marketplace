import "./Button.css";

function Button({
    children,
    variant = "success",
    type = "button",
    onClick,
    disabled = false,
}) {
    return (
        <button type={type}
        className={`btn btn-${variant}`}
        onClick={onClick}
        disabled={disabled}
        >
            {children}
            </button>
    );
}

export default Button;