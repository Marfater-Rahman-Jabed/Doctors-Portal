
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOut = ({ data }) => {

    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { price } = data;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-nu-nine.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: data.name,
                        email: data.email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
        }
        if (paymentIntent.status === "succeeded") {
            // console.log(paymentIntent)
            setSuccess('Congrates!!! Your payment is successfully done');
            setTransectionId(paymentIntent.id)
            setProcessing(false)

            const payment = {
                name: data.name,
                price,
                transectionId: paymentIntent.id,
                bookingId: data._id
            }

            fetch('https://doctors-portal-server-nu-nine.vercel.app/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }




    }

    return (
        <>
            <form className='w-96 my-12' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-6' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-error">{cardError}</p>
            {
                success && <>
                    <p className='text-success'>{success}</p>
                    <p> Your Transection id : <strong>{transectionId}</strong></p>
                </>
            }
        </>
    );
};

export default CheckOut;