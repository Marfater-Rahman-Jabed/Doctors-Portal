import { format } from 'date-fns/esm';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ modalName, selectedDate, setModalName, refetch }) => {
    const { name, slots, price } = modalName;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    const handleModal = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        console.log(date, slot, name, email, phone);
        const booking = {
            appointmentDate: date,
            slot, name: user?.displayName, email, phone, treatment: modalName.name, price
        }

        fetch('https://doctors-portal-server-nu-nine.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {

                    toast.success('Boooking confirmed');
                    setModalName(null);
                    refetch();
                }
                else {
                    toast.error(`${data.message} ${date}`);
                    setModalName(null);
                }
            })


    }
    return (
        <>
            <input type="checkbox" id="Booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleModal} className='grid grid-cols-1 gap-3 mt-6'>
                        <input type="text" disabled value={date} className="input input-bordered w-full " />
                        <select name='slot' className="select select-bordered w-full ">

                            {
                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Patient Name" className="input input-bordered w-full " />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input input-bordered w-full " />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full " />
                        <input type="submit" className='w-full btn btn-accent' value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;