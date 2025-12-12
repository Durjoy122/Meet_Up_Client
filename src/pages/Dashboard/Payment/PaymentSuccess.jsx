import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import AuthLayout from '../../../layouts/AuthLayout';
import useAuth from '../../../hooks/useAuth';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axios = useAxios();
    const { user } = useAuth();


    useEffect(() => {
        if (sessionId) {
            axios.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    if (res.data.alreadyPaid) {
                        alert("You already paid for this club!");
                        return;   // stop running further
                    }

                    alert("Payment Successful!");
                    setPaymentInfo(res.data);
                })
                .catch(err => {
                    console.error(err);
                    alert("Something went wrong!");
                });
        }
    }, [sessionId, axios ,user]);

    return (
        <div>
            <h2 className="text-4xl">Payment successful</h2>

            {paymentInfo.transactionId && (
                <>
                    <p>Your TransactionId: {paymentInfo.transactionId}</p>
                    <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
                </>
            )}
        </div>
    );
};

export default PaymentSuccess;