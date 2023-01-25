import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import People1 from '../../../assets/images/people1.png';
import People2 from '../../../assets/images/people2.png';
import People3 from '../../../assets/images/people3.png';
import ReviewsCard from './ReviewsCard';

const Testimonial = () => {
    const reviews = [
        {
            _id: 1,
            says: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            name: 'Winson Herry',
            location: 'California',
            img: People1
        },
        {
            _id: 2,
            says: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            name: 'Winson Herry',
            location: 'California',
            img: People2
        },
        {
            _id: 3,
            says: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            name: 'Winson Herry',
            location: 'California',
            img: People3
        },
    ]
    return (
        <div className='mt-12 '>
            <section className='flex justify-between mb-4 p-6'>
                <div>
                    <h1 className="text-xl text-primary font-bold">Testimonial</h1>
                    <h1 className="text-5xl">What Our Patients Says </h1>
                </div>
                <div>
                    <img src={quote} alt="" className='w-24 lg:w-48' />
                </div>
            </section>
            <div className='grid gap-6 px-3  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {reviews.map(review => <ReviewsCard
                    key={review._id}
                    review={review}
                ></ReviewsCard>)}
            </div>
        </div>
    );
};

export default Testimonial;