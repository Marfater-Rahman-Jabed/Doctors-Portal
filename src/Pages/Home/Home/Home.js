import React from 'react';
import Banner from '../Banner/Banner';
import DentalCare from '../DentalCare/DentalCare';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import ServicesCard from '../Services/ServicesCards/ServicesCard';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <ServicesCard></ServicesCard>
            <DentalCare></DentalCare>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Home;