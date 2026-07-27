import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

import "./OrderHistory.css";

function OrderHistory() {

    const navigate = useNavigate();

    const [orders] = useState([
        {
            orderId: 101,
            orderDate: "27 Jul 2026",
            totalAmount: 620,
            status: "PENDING"
        },
        {
            orderId: 102,
            orderDate: "20 Jul 2026",
            totalAmount: 1250,
            status: "DELIVERED"
        }
    ]);

    useEffect(() => {

        // Later
        // GET /api/orders/user/{userId}

    }, []);

    return (

        <div className="container py-4">

            <h2 className="mb-4">
                My Orders
            </h2>

            {
                orders.length === 0 ?

                    <div className="empty-orders">

                        <h4>No Orders Found</h4>

                    </div>

                    :

                    <div className="order-list">

                        {

                            orders.map(order => (

                                <Card key={order.orderId}>

                                    <div className="order-card">

                                        <div>

                                            <h4>
                                                Order #{order.orderId}
                                            </h4>

                                            <p>
                                                Date : {order.orderDate}
                                            </p>

                                            <p>
                                                Status : {order.status}
                                            </p>

                                            <h5>
                                                ₹{order.totalAmount}
                                            </h5>

                                        </div>

                                        <Button
                                            onClick={() =>
                                                navigate(`/orders/${order.orderId}`)
                                            }
                                        >
                                            View Details
                                        </Button>

                                    </div>

                                </Card>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default OrderHistory;