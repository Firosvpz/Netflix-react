import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp } = UserAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }
    return (
        <>
           <div className='w-full h-screen relative'>
    <img className='hidden sm:block absolute w-full h-full object-cover blur-sm'
         src="https://singh-cp.github.io/netflix-landingpage/images/netflix-background-image.jpg" alt="/" />
    <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
    <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white rounded-lg`1  shadow-lg'>
            <div className='max-w-[320px] mx-auto py-16'>
                <h1 className='text-4xl font-extrabold mb-8'>Sign Up</h1>
                {error ? <p className='bg-red-600 p-2 rounded text-sm text-white mb-4'>{error}</p> : null}
                <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className='p-4 my-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600' 
                        type="email" 
                        placeholder='Email' 
                        autoComplete='email' />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-4 my-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600' 
                        type="password" 
                        placeholder='Password' 
                        autoComplete='current-password' />
                    <button className='bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700 transition duration-300'>Sign Up</button>
                    <div className='flex justify-between items-center text-sm text-gray-400'>
                        <p><input className='mr-2' type="checkbox" /> Remember me</p>
                        <p className='hover22over:underline cursor-pointer'>Need Help?</p>
                 </div>
                    <p className='py-8 text-center'><span className='text-gray-400'>Already subscribed to Netflix?</span> {' '}
                        <Link to='/login' className='text-white hover:underline'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</div>



        </>
    )
}

export default Signup