import React from 'react';
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const ClubDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const { user } = useAuth();

    const { data: club, isLoading } = useQuery({
        queryKey: ['club', id],
        queryFn: async () => {
            const res = await axios.get(`/clubs/${id}`);
            return res.data;
        }
    });

    const { data: member } = useQuery({
        queryKey: ['member', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/payment-for-club?email=${user.email}`);
            //console.log(res.data[0]?.userEmail);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Loading />
            </div>
        );
    }

    if (!club) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl text-red-600">Club details not found.</p>
            </div>
        );
    }

    const formattedDate = new Date(club.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    const requiresPayment = club?.membershipFee > 0;

    const alreadyPaid = member?.some(m => 
        m.clubId === club._id && m.paymentStatus === "paid"
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Club Details Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    
                    {/* Club Name Header */}
                    <div className="bg-indigo-600 p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                            {club?.clubName || 'Club Details'}
                        </h1>
                    </div>

                    {/* Details Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                        
                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
                                Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {club?.description || 'No description provided for this club.'}
                            </p>
                        </div>
                        
                        {/* Key Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">

                            {/* Membership Fee */}
                            <DetailItem 
                                label="Membership Fee" 
                                value={club?.membershipFee ? `$${club.membershipFee}` : 'Free'}
                                highlight={requiresPayment ? 'text-green-600 font-bold' : 'text-indigo-600 font-bold'}
                            />

                            {/* Creation Date */}
                            <DetailItem 
                                label="Creating Date" 
                                value={formattedDate}
                                highlight="text-gray-900"
                            />
                            
                            <DetailItem 
                                label="Club ID" 
                                value={club?._id || id}
                                highlight="text-gray-500 text-sm"
                            />
                        </div>

                        {/* === NEW: Pay Button Section === */}
                        {alreadyPaid ? (
                                <div className="pt-6 border-t mt-6">
                                    <button
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent 
                                        text-base font-medium rounded-lg shadow-sm text-white bg-gray-500 cursor-not-allowed"
                                        disabled
                                    >
                                        Already Paid
                                    </button>
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        You have already completed the membership payment.
                                    </p>
                                </div>
                            ) : (
                                <Link to={`/dashboard/payment/${club._id}`}>
                                    <div className="pt-6 border-t mt-6">
                                        <button
                                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent 
                                            text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition 
                                            duration-150 transform hover:scale-[1.01]"
                                        >
                                            Pay ${club.membershipFee} Now
                                        </button>
                                        <p className="text-sm text-gray-500 mt-2 text-center">
                                            Click to complete the membership payment.
                                        </p>
                                    </div>
                                </Link>
                          )}
                        {/* === END NEW SECTION === */}

                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                        &larr; Back to Clubs
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, highlight }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className={`mt-1 text-lg ${highlight}`}>
            {value}
        </dd>
    </div>
);

export default ClubDetails;