import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe('pk_test_51MXk7BEyUetrllCJ7hbDQv7vkTzBRBYGFACsV7chRpc1A74ic6ap5ydyrUAMYk29K14dthf5hpRbXGqd6LVRxVcw00wQid0SOX');
console.log(stripePromise)

const Payment = () => {
    const data = useLoaderData();
    const { treatment, appointmentDate, price, slot } = data
    return (
        <div>
            <h1 className="text-3xl">Payment for {treatment} </h1>
            <h2>Please pay <strong>${price}</strong> on {appointmentDate} at {slot}</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut
                        data={data}

                    />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;