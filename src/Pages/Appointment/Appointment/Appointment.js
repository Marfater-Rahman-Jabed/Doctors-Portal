import React, { useState } from 'react';
import AppointmentAvailable from '../AppointmentAvailabe/AppointmentAvailable';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AppointmentAvailable
                selectedDate={selectedDate}
            ></AppointmentAvailable>
        </div>
    );
};

export default Appointment;