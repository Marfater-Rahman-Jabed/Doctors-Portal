import React from 'react';
import Icon1 from '../../../../assets/images/fluoride.png';
import Icon2 from '../../../../assets/images/cavity.png';
import Icon3 from '../../../../assets/images/whitening.png'
import ServiceCarrd from './ServiceCarrd';

const ServicesCard = () => {
    const ServiceCardData = [
        {
            id: 1,
            icon: Icon1,
            name: 'Fluride Treatement',
            description: 'Fluride is very attractive part of our life'
        },
        {
            id: 2,
            icon: Icon2,
            name: 'Cavity Felling',
            description: 'Fluride is very attractive part of our life'
        },
        {
            id: 3,
            icon: Icon3,
            name: 'Teeth Whitting',
            description: 'Fluride is very attractive part of our life'
        }
    ]
    return (
        <div className='mt-24'>
            <div className='mb-16'>
                <h2 className='text-center  text-2xl text-primary font-bold'>Our Services</h2>
                <h1 className='text-center text-5xl'>Services We Provide</h1>
            </div>
            <div className='grid gap-6 mt-16  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    ServiceCardData.map(service => <ServiceCarrd
                        key={service.id}
                        service={service}

                    ></ServiceCarrd>)
                }
            </div>
        </div>
    );
};

export default ServicesCard;