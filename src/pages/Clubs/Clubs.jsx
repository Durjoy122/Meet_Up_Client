import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const Clubs = () => {
    const axios = useAxios();
    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', 'approved'],
        queryFn: async () => {
            const res = await axios.get('/clubs');
            return res.data;
        }
    });

    const approvedClubs = clubs.filter(club => club.status === "approved");

    if (isLoading) return <Loading />;

    return (
        // Simpler grid with better padding
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
            {approvedClubs.map((club) => {
                const imageUrl = club.bannerImage?.url || club.bannerImage || "";
                return (
                    <div
                        key={club._id}
                        className="group flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {/* Banner Image */}
                        <div className="relative h-40 w-full overflow-hidden">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={club.clubName}
                                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            )}
                            <div className="absolute top-3 left-3 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {club.category}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-gray-800 mb-1 truncate">
                                {club.clubName}
                            </h2>
                            <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm flex-grow">
                                <p className="text-gray-500 font-medium">Creator:</p> 
                                <p className="text-gray-700 font-semibold text-right truncate">{club.creatorName}</p>
                                
                                <p className="text-gray-500 font-medium">District:</p>
                                <p className="text-gray-700 font-semibold text-right truncate">{club.creatorDistrict}</p>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-lg font-extrabold text-green-600">
                                    {club.membershipFee > 0 ? `$${club.membershipFee}` : 'Free'}
                                </p>
                                <Link to={`/dashboard/clubs/${club._id}`}>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors active:scale-95">
                                        Details
                                    </button>
                                 </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Clubs;