import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";

import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    // Temporary data
    const [cartItems, setCartItems] = useState([
        {
            cartItemId: 1,
            productName: "Fresh Tomato",
            image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300",
            quantity: 2,
            price: 80,
            totalPrice: 160
        },
        {
            cartItemId: 2,
            productName: "Potato",
            image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300",
            quantity: 3,
            price: 40,
            totalPrice: 120
        }
    ]);

    useEffect(() => {

        // Later
        // cartApi.getCartByUserId(userId)

    }, []);

    const handleIncrease = (cartItemId) => {

        setCartItems(items =>
            items.map(item => {

                if (item.cartItemId === cartItemId) {

                    const quantity = item.quantity + 1;

                    return {
                        ...item,
                        quantity,
                        totalPrice: quantity * item.price
                    };
                }

                return item;
            })
        );
    };

    const handleDecrease = (cartItemId) => {

        setCartItems(items =>
            items.map(item => {

                if (
                    item.cartItemId === cartItemId &&
                    item.quantity > 1
                ) {

                    const quantity = item.quantity - 1;

                    return {
                        ...item,
                        quantity,
                        totalPrice: quantity * item.price
                    };
                }

                return item;
            })
        );
    };

    const handleRemove = (cartItemId) => {

        setCartItems(items =>
            items.filter(item => item.cartItemId !== cartItemId)
        );
    };

    const subtotal = useMemo(() => {

        return cartItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        );

    }, [cartItems]);

    const totalItems = useMemo(() => {

        return cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

    }, [cartItems]);

    const tax = 0;

    const totalAmount = subtotal + tax;

    const handleCheckout = () => {

        navigate("/checkout");

    };

    return (

        <div className="cart-page container py-4">

            <h2 className="mb-4">
                Shopping Cart
            </h2>

            {
                cartItems.length === 0 ?

                    <div className="empty-cart">

                        <h4>Your cart is empty</h4>

                    </div>

                    :

                    <div className="cart-layout">

                        <div className="cart-items">

                            {
                                cartItems.map(item => (

                                    <CartItem
                                        key={item.cartItemId}
                                        item={item}
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                        onRemove={handleRemove}
                                    />

                                ))
                            }

                        </div>

                        <div className="cart-summary-section">

                            <CartSummary
                                totalItems={totalItems}
                                subtotal={subtotal}
                                tax={tax}
                                totalAmount={totalAmount}
                                onCheckout={handleCheckout}
                            />

                        </div>

                    </div>

            }

        </div>

    );

}

export default Cart;