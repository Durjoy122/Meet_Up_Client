import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const ApproveClubs = () => {
    const axios = useAxios();
    const { refetch, data: clubs = [] } = useQuery({
        queryKey: ['clubs', 'pending'],
        queryFn: async () => {
            const res = await axios.get('/clubs');
            return res.data;
        }
    })

    const updateRiderStatus = (club , status) => {
        const updateInfo = { status: status}
        axios.patch(`/clubs/${club._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Club status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = club => {
        updateRiderStatus(club, 'approved');
    }

    const handleRejection = club => {
        updateRiderStatus(club, 'rejected')
    }
    return (
         <div>
            <h2 className="text-5xl">Clubs Pending Approval: {clubs.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Application Status</th>
                            <th>Pictures</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clubs.map((club, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{club.clubName}</td>
                                <td>{club.category}</td>
                                <td>{club.creatorRegion}</td>
                                <td>
                                    <p className={`${club.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{club.status}</p>
                                </td>
                                <td>
                                    <button
                                         className='btn'>
                                        <FaEye></FaEye>
                                    </button>
                                    <button
                                        onClick={() => handleApproval(club)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRejection(club)}
                                        className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveClubs;