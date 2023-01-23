import React from 'react';

const ServiceCarrd = ({ service }) => {
    const { icon, name, description } = service;
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl ">
                <figure><img src={icon} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className=" text-center font-semibold">{name}</h2>
                    <p className='text-center'>{description}</p>

                </div>
            </div>
        </div>
    );
};

export default ServiceCarrd;