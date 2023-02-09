import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useToken from '../Hooks/useToken';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const { createUser, updateUser, googleHandle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('')
    const [token] = useToken(userEmail);

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleSignUp = data => {
        // console.log(data)
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Successfully created!')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(error => {
                        console.log(error)
                    })


            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message)
            })
    }
    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();

        googleHandle(provider)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))

    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch(`https://doctors-portal-server-nu-nine.vercel.app/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserEmail(email)
            })
    }


    return (
        <div className='my-32 flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <h1 className='text-center text-xl'>SignUp</h1>
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
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' {...register("password",

                            {
                                required: "Password is required", minLength: { value: 6, message: "Password atleast 6 charecter" },
                                pattern: { value: /(?=.*[!#$%&@^? "])(?=.*\d)(?=.*[a-zA-Z])/, message: "Password must be strong" }

                            })} placeholder="Password" className="input input-bordered w-full " />
                        {errors.password && <span className='text-error'>{errors.password.message}</span>}
                    </div>
                    <input type="submit" value="Submit" className='btn btn-accent w-full mt-3' />
                    {signUpError && <p className='text-error'>{signUpError}</p>}
                    <p>All ready have an account <Link className='text-secondary' to='/login'>Please Login</Link></p>

                </form>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full' onClick={handleGoogle}>Continue With Google</button>

            </div>
        </div>
    );
};

export default SignUp;