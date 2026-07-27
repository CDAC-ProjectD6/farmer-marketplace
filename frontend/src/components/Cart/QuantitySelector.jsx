import "./QuantitySelector.css";
import Button from "../Button/Button";

function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease
}) {

    return (
        <div className="quantity-selector">

            <Button
                variant="secondary"
                onClick={onDecrease}
                disabled={quantity <= 1}
            >
                -
            </Button>

            <span className="quantity-value">
                {quantity}
            </span>

            <Button
                variant="success"
                onClick={onIncrease}
            >
                +
            </Button>

        </div>
    );
}

export default QuantitySelector;