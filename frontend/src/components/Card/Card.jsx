import "./Card.css";

function Card({
    children,
    title,
    footer,
    className = "",
    onClick
}) {
    return (
        <div
            className={`custom-card ${className}`}
            onClick={onClick}
        >
            {title && (
                <div className="card-header-custom">
                    <h4>{title}</h4>
                </div>
            )}

            <div className="card-body-custom">
                {children}
            </div>

            {footer && (
                <div className="card-footer-custom">
                    {footer}
                </div>
            )}
        </div>
    );
}

export default Card;