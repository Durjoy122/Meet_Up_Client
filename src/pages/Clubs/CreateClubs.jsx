import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const CreateClubs = () => {
    const { register, handleSubmit, control } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const serviceCenters = useLoaderData();
    const axios = useAxios();

    const regions = [...new Set(serviceCenters.map(c => c.region))];
    const creatorRegion = useWatch({ control, name: 'creatorRegion' });

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        return regionDistricts.map(d => d.district);
    }

    const createClub = (data) => {
        console.log(data);
        Swal.fire({
            title: "Club Will be Created",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/clubs', data).then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Club has been created.",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                });
            }
        });
    }

    return (
        <div>
            <h2 className="text-5xl font-bold mt-5">Create A Club</h2>
            <form onSubmit={handleSubmit(createClub)} className='mt-4 p-4 text-black'>

                {/* Club info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-2'>
                    <fieldset className="fieldset">
                        <label className="label">Club Name</label>
                        <input type="text" {...register('clubName')} className="input w-full" placeholder="Club Name" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Category</label>
                        <select {...register('category')} defaultValue="Pick a category" className="select">
                            <option disabled>Pick a category</option>
                            <option value="Photography">Photography</option>
                            <option value="Sports">Sports</option>
                            <option value="Tech">Tech</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                        </select>
                    </fieldset>
                </div>

                {/* Creator details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <fieldset className="fieldset">
                        <label className="label">Creator Name</label>
                        <input type="text" {...register('creatorName')} defaultValue={user?.displayName} className="input w-full" />

                        <label className="label">Creator Email</label>
                        <input type="text" {...register('creatorEmail')} defaultValue={user?.email} className="input w-full" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register('creatorRegion')} defaultValue="Pick a region" className="select">
                                <option disabled>Pick a region</option>
                                {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">City</legend>
                            <select {...register('creatorDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled>Pick a district</option>
                                {districtsByRegion(creatorRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </fieldset>

                        <label className="label mt-4">Description</label>
                        <input type="text" {...register('creatorAddress')} className="input w-full" placeholder="Description" />
                    </fieldset>

                    {/* Additional Club info */}
                    <fieldset className="fieldset">
                        <label className="label">Banner Image</label>
                        <input type="file" {...register('bannerImage')} className="input w-full" accept="image/*" />

                        <label className="label mt-4">Membership Fee</label>
                        <input type="number" {...register('membershipFee', { valueAsNumber: true })} defaultValue={0} className="input w-full" />

                        <input type="hidden" {...register('createdAt')} value={new Date().toISOString()} />
                        <input type="hidden" {...register('updatedAt')} value={new Date().toISOString()} />
                    </fieldset>
                </div>

                <input type="submit" className='btn btn-primary mt-8 text-black' value="Create Club" />
            </form>
        </div>
    );
}

export default CreateClubs;