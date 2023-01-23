import React from 'react';
import Icon1 from '../../../assets/icons/clock.svg';
import Icon2 from '../../../assets/icons/marker.svg';
import Icon3 from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const CardData = [
        {
            id: 1,
            icon: Icon1,
            description: 'Openning at 10 AM to 5 PM ',
            name: 'Openning Hour',
            bgColor: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            icon: Icon2,
            description: 'Kotbari,Comilla ',
            name: 'Visit Our Location',
            bgColor: 'bg-accent'
        },
        {
            id: 3,
            icon: Icon3,
            description: '01827717200',
            name: 'Contact us Now',
            bgColor: 'bg-gradient-to-r from-primary to-secondary'
        }
    ]
    return (
        <div className='grid gap-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                CardData.map(card => <InfoCard

                    key={card.id}
                    card={card}
                >
                </InfoCard>)
            }
        </div>
    );
};

export default InfoCards;