import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Loading/Loading';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {
    const [doctorDetails, setDoctorDetais] = useState(null);
    // const [confirmDelete, setConfirmDelete] = useState('');
    // console.log(confirmDelete)

    const CloseModal = () => {
        setDoctorDetais(null);
    }

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-nu-nine.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;

            }
            catch (error) {
                console.log(error)
            }
        }
    });
    const successModal = (data) => {
        console.log(data);
        fetch(`https://doctors-portal-server-nu-nine.vercel.app/doctors/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch();
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-3xl mb-2'>Manage Doctor : {doctors.length} </h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>

                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td><label htmlFor="ConfirmModal" className="btn btn-sm btn-error" onClick={() => setDoctorDetais(doctor)}>Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                doctorDetails && <ConfirmationModal
                    message={`Are you sure You want to delete ${doctorDetails.name}`}
                    CloseModal={CloseModal}
                    successModal={successModal}
                    data={doctorDetails}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;