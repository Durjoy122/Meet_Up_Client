import React from 'react';
import { useParams } from "react-router-dom";
import useAxios from '../../../hooks/useAxios';
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
    const { clubId } = useParams();
    const axios = useAxios();

    const { isLoading, data: club } = useQuery({
        queryKey: ['clubs', clubId],
        queryFn: async () => {
            const res = await axios.get(`/clubs/${clubId}`);
            return res.data;
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            membershipFee: club.membershipFee,
            clubId: club._id,
            senderEmail: club.creatorEmail,
            clubName: club.clubName
        };

        const res = await axios.post('/create-payment-intent', paymentInfo);
        window.location.href = res.data.url;
   };

    if(isLoading) {
        return <div><Loading /></div>
    }

    return (
        <div>
            <h1> club Name : {club?.clubName} </h1>
            <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;