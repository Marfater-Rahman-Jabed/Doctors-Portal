import React from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';

const Banner = () => {
    return (
        <div >
            <div className="hero py-16 " style={{ backgroundImage: `url(${bg})`, }} >
                <div className="hero-content flex-col md:flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div >
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;