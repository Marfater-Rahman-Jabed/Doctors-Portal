import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useToken from '../Hooks/useToken';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('')
    const { signIn, googleHandle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [LoginEmail, setLoginEmail] = useState('')
    const [token] = useToken(LoginEmail);

    const from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data)
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('Successfully Login');
                // getUserToken(data.email);
                setLoginEmail(data.email);

            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message);
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
    // const getUserToken = email => {
    //     fetch(`https://doctors-portal-server-nu-nine.vercel.app/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             localStorage.setItem('accessToken', data.accessToken)
    //             // console.log(data.accessToken)
    //         })

    // }

    return (
        <div className='my-32 flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <h1 className='text-center text-xl'>Login</h1>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type='email' placeholder="Email" className="input input-bordered w-full " />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                        {loginError && <p className='text-error'>{loginError === 'Firebase: Error (auth/user-not-found).' ? 'Enter Valid Email' : <></>}</p>}
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password should atleast 6 charecter" } })} type='password' placeholder="Password" className="input input-bordered w-full " />
                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                        {loginError && <p className='text-error'>{loginError === 'Firebase: Error (auth/wrong-password).' ? 'Wrong Password' : <></>}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>

                    </div>

                    <input type="submit" value="Submit" className='btn btn-accent w-full mt-3' />
                    <p>New in Doctor Portal ? <Link className='text-secondary' to='/signup'>Create New Account</Link></p>

                </form>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full' onClick={handleGoogle}>Continue With Google</button>
            </div>

        </div>
    );
};

export default Login;