import "./CartItem.css";
import Card from "../Card/Card";
import Button from "../Button/Button";
import QuantitySelector from "./QuantitySelector";

function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {

    return (
        <Card>

            <div className="cart-item">

                <div className="cart-item-image">
                    <img
                        src={
                            item.image ||
                            "https://placehold.co/120x120?text=Product"
                        }
                        alt={item.productName}
                    />
                </div>

                <div className="cart-item-details">

                    <h4>{item.productName}</h4>

                    <p className="price">
                        Price : ₹{item.price}
                    </p>

                    <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => onIncrease(item.cartItemId)}
                        onDecrease={() => onDecrease(item.cartItemId)}
                    />

                    <h5>
                        Total : ₹{item.totalPrice}
                    </h5>

                </div>

                <div className="cart-item-action">

                    <Button
                        variant="danger"
                        onClick={() => onRemove(item.cartItemId)}
                    >
                        Remove
                    </Button>

                </div>

            </div>

        </Card>
    );
}

export default CartItem;