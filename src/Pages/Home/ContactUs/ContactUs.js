import React from 'react';
import backgroundImages from '../../../assets/images/appointment.png';

const ContactUs = () => {
    return (
        <div style={{ background: `url(${backgroundImages})` }} className='mt-16 '>

            <div className='text-center py-20'>
                <h1 className='font-bold text-primary text-xl'>Contact Us</h1>
                <h1 className='text-3xl text-white mb-12'>Stay connected with us</h1>
                <input type="text" placeholder="Type here" className="input w-1/3 mb-5" /><br />
                <input type="text" placeholder="Type here" className="input w-1/3 mb-5" /><br />
                <input type="text" placeholder="Type here" className="input w-1/3 h-24 mb-5" /><br />
                <button className='btn btn-primary mt-4' >Submit</button>
            </div>

        </div>
    );
};

export default ContactUs;