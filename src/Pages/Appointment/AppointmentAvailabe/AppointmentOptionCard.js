import React from 'react';

const AppointmentOptionCard = ({ Appointment, setModalName }) => {
    const { name, slots } = Appointment
    return (
        <div className="card  shadow-xl">
            <div className="card-body">
                <h2 className="text-secondary font-bold text-center">{name}</h2>
                <p className='text-center'>{slots.length > 0 ? slots[0] : 'No Slots today. Try another day'}</p>
                <p className='text-center'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        htmlFor="Booking-modal"
                        className="btn btn-primary"
                        onClick={() => setModalName(Appointment)}>Booking Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptionCard;