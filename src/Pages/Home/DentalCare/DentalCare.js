import React from 'react';
import LogoDental from '../../../assets/images/treatment.png'

const DentalCare = () => {
    return (
        <div className='md:block lg:flex gap-24 mt-36 '>
            <div className='w-full  lg:w-1/2'>
                <img src={LogoDental} alt="" className='h-full  lg:rounded-xl rounded-md' />
            </div>
            <div className='w-full lg:w-1/2 my-auto '>
                <h1 className='text-3xl font-bold mb-3'>Exceptional Dental <br /> Care, on Your Terms</h1>
                <p className='mb-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <button className='btn btn-primary'>Get started</button>
            </div>
        </div>
    );
};

export default DentalCare;