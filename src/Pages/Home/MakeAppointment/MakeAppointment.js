import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import back from '../../../assets/images/appointment.png'

const MakeAppointment = () => {
    return (
        <div className="hero mt-44 " style={{ background: `url(${back})` }}>
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} alt='' className="-mt-32  hidden md:block lg:w-1/2  rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold text-white">Box Office News!</h1>
                    <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;