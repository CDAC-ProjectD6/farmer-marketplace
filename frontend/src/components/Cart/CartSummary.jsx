import "./CartSummary.css";
import Card from "../Card/Card";
import Button from "../Button/Button";

function CartSummary({
    totalItems,
    subtotal,
    tax = 0,
    totalAmount,
    onCheckout
}) {

    return (
        <Card>

            <div className="cart-summary">

                <h3>Order Summary</h3>

                <div className="summary-row">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                </div>

                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="summary-row">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                </div>

                <hr />

                <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                </div>

                <Button
                    variant="success"
                    onClick={onCheckout}
                >
                    Proceed To Checkout
                </Button>

            </div>

        </Card>
    );
}

export default CartSummary;