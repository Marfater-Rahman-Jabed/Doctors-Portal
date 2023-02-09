import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageKey = process.env.REACT_APP_imageKey;
    const navigate = useNavigate();

    const { data: OptionSelect = [], isLoading } = useQuery({
        queryKey: ['appointmentSelect'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-nu-nine.vercel.app/appointmentSelect')
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDoctor = data => {
        console.log(data.image[0])
        const formData = new FormData();
        const image = data.image[0]
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=${imageKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {

                if (imageData.success) {
                    console.log(imageData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.option,
                        image: imageData.data.url
                    }

                    fetch('https://doctors-portal-server-nu-nine.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result.acknowledged) {
                                toast.success(`${data.name} is added successfully`);
                                navigate('/dashboard/managedoctor');
                            }
                        })
                }
            })
    }
    return (
        <div className='w-96 p-14'>
            <form onSubmit={handleSubmit(handleDoctor)}>

                <h1 className='text-center text-xl'>Add a doctor</h1>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type='text' {...register("name")} placeholder="Name" className="input input-bordered w-full " />
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type='email' {...register("email", { required: "Email is required" })} placeholder="Email" className="input input-bordered w-full " />
                    {errors.email && <span className='text-error'>{errors.email.message}</span>}

                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("option")} className="select select-bordered w-full max-w-xs">

                        {
                            OptionSelect.map(options => <option

                                key={options._id}
                                value={options.name}
                            >{options.name}</option>
                            )
                        }
                    </select>
                </div>
                <label className="label">
                    <span className="label-text">Photo</span>
                </label>
                <input type='file' {...register("image")} placeholder="photo" className="input input-bordered w-full  " />
                <input type="submit" value="Add Doctor" className='btn btn-accent w-full mt-3' />
                {/* {signUpError && <p className='text-error'>{signUpError}</p>}
                <p>All ready have an account <Link className='text-secondary' to='/login'>Please Login</Link></p> */}

            </form>
        </div>
    );
};

export default AddDoctor;