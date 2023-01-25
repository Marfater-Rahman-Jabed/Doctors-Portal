import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import back from '../../../assets/images/bg.png'


const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <div>
            <div className="hero my-6" style={{
                background: `url(${back})`,
                backgroundSize: 'cover'
            }}>
                <div className="hero-content flex-col gap-16 lg:flex-row-reverse">
                    <img src={chair} alt="" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}


                        />

                    </div>

                </div>
            </div>
        </div >
    );
};

export default AppointmentBanner;