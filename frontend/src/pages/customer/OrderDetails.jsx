import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../components/Card/Card";

import "./OrderDetails.css";

function OrderDetails() {

    const { orderId } = useParams();

    const [order] = useState({

        orderId: orderId,
        orderDate: "27 Jul 2026",

        shippingAddress: "Pune, Maharashtra",

        mobile: "9876543210",

        paymentMethod: "COD",

        status: "PENDING",

        subtotal: 280,

        tax: 0,

        totalAmount: 280,

        items: [

            {
                productId: 1,
                productName: "Fresh Tomato",
                quantity: 2,
                price: 80,
                totalPrice: 160
            },

            {
                productId: 2,
                productName: "Potato",
                quantity: 3,
                price: 40,
                totalPrice: 120
            }

        ]

    });

    useEffect(() => {

        // Later
        // GET /api/orders/{orderId}

    }, [orderId]);

    return (

        <div className="container py-4">

            <h2 className="mb-4">
                Order Details
            </h2>

            <Card>

                <div className="order-info">

                    <p><strong>Order ID :</strong> #{order.orderId}</p>

                    <p><strong>Date :</strong> {order.orderDate}</p>

                    <p><strong>Status :</strong> {order.status}</p>

                    <p><strong>Payment :</strong> {order.paymentMethod}</p>

                    <p><strong>Mobile :</strong> {order.mobile}</p>

                    <p><strong>Address :</strong> {order.shippingAddress}</p>

                </div>

            </Card>

            <Card>

                <h3>Ordered Products</h3>

                <table className="order-table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Qty</th>

                            <th>Price</th>

                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            order.items.map(item => (

                                <tr key={item.productId}>

                                    <td>{item.productName}</td>

                                    <td>{item.quantity}</td>

                                    <td>₹{item.price}</td>

                                    <td>₹{item.totalPrice}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </Card>

            <Card>

                <div className="bill-summary">

                    <p>
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                    </p>

                    <p>
                        <span>Tax</span>
                        <span>₹{order.tax}</span>
                    </p>

                    <hr />

                    <h3>
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                    </h3>

                </div>

            </Card>

        </div>

    );

}

export default OrderDetails;