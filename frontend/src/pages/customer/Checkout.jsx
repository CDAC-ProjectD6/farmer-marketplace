import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

import "./Checkout.css";

function Checkout() {

    const [formData, setFormData] = useState({
        shippingAddress: "",
        pincode: "",
        mobile: "",
        paymentMethod: "COD"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

        // Later:
        // POST /api/orders/place

    };

    return (

        <div className="checkout-page container py-4">

            <h2 className="mb-4">
                Checkout
            </h2>

            <Card>

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Shipping Address"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        placeholder="Enter Shipping Address"
                    />

                    <Input
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter Pincode"
                    />

                    <Input
                        label="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                    />

                    <div className="payment-section">

                        <label>
                            Payment Method
                        </label>

                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="COD">
                                Cash On Delivery
                            </option>

                            <option value="ONLINE">
                                Online Payment
                            </option>
                        </select>

                    </div>

                    <Button
                        type="submit"
                        variant="success"
                    >
                        Place Order
                    </Button>

                </form>

            </Card>

        </div>

    );

}

export default Checkout;