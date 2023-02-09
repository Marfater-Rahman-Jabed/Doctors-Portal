import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const AllUser = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-nu-nine.vercel.app/user');
            const data = await res.json();
            return data;
        }
    })

    const [userDetails, setUserDetails] = useState(null);

    const CloseModal = () => {
        setUserDetails(null)
    }

    const successModal = data => {
        console.log(data)
        fetch(`https://doctors-portal-server-nu-nine.vercel.app/user/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                refetch();
            })
    }

    const handleAdmin = id => {
        // console.log(id)
        fetch(`https://doctors-portal-server-nu-nine.vercel.app/user/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('admin added successfully')
                    refetch();
                }
            })

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) => <tr key={i} className="hover">
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    user?.role !== 'admin' ?
                                        <button className='btn btn-xs btn-primary ' onClick={() => handleAdmin(user._id)}>Make Admin</button> : <p className='text-success'>Admin</p>}</td>
                                <td>{
                                    user?.role !== 'admin' &&
                                    <label htmlFor="ConfirmModal" className="btn btn-sm btn-error" onClick={() => setUserDetails(user)}>Delete</label>}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                userDetails && <ConfirmationModal
                    message={`Are you want to delete ${userDetails.name}`}
                    CloseModal={CloseModal}
                    successModal={successModal}
                    data={userDetails}
                ></ConfirmationModal>

            }
        </div>
    );
};

export default AllUser;