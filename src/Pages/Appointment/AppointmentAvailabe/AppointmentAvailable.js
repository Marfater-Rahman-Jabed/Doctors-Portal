import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointmentOptionCard from './AppointmentOptionCard';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from 'react-query';
import Loading from '../../../Loading/Loading';

const AppointmentAvailable = ({ selectedDate }) => {
    // const [appointmentOption, setAppointmentOption] = useState([]);
    const [modalName, setModalName] = useState(null);

    const date = format(selectedDate, 'PP');
    const { data: appointmentOption = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOption'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-nu-nine.vercel.app/appointment?date=${date}`);
            const data = res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-nu-nine.vercel.app/appointment')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOption(data))
    // }, [])
    return (
        <div className='my-12'>
            <p className='text-center text-primary font-bold'>Available Services on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 my-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOptionCard
                        key={option._id}
                        Appointment={option}
                        setModalName={setModalName}
                    ></AppointmentOptionCard>)
                }
            </div>

            {modalName &&
                <BookingModal
                    modalName={modalName}
                    selectedDate={selectedDate}
                    setModalName={setModalName}
                    refetch={refetch}
                ></BookingModal>}
        </div>
    );
};

export default AppointmentAvailable;