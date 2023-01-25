import React from 'react';

const ReviewsCard = ({ review }) => {
    const { name, says, location, img } = review

    return (
        <div className="card  shadow-xl">
            <div className="card-body">

                <p>{says}</p>
                <div className="flex items-center mt-6">
                    <div className="avatar mr-4">
                        <div className="w-16   rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt="" className='w-16' />
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold'>{name}</h1>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;