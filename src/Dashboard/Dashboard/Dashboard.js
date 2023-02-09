import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const url = `https://doctors-portal-server-nu-nine.vercel.app/booking?email=${user?.email}`;
    const { data: bookingList = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = res.json();
            return data;
        }
    })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingList.map((booking, i) => <tr className="hover">
                                <th>{i + 1}</th>
                                <td>{booking.name}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.slot}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>}
                                    {
                                        booking.price && booking.paid && <span className='text-success'><strong>Paid</strong></span>
                                    }

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;