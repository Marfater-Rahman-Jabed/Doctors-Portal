import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointmentOptionCard from './AppointmentOptionCard';
import BookingModal from '../BookingModal/BookingModal';

const AppointmentAvailable = ({ selectedDate }) => {
    const [appointmentOption, setAppointmentOption] = useState([]);
    const [modalName, setModalName] = useState(null);

    useEffect(() => {
        fetch('AppointmentService.json')
            .then(res => res.json())
            .then(data => setAppointmentOption(data))
    }, [])
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

                ></BookingModal>}
        </div>
    );
};

export default AppointmentAvailable;