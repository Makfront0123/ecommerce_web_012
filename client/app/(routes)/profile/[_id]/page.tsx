"use client";
import { useGlobalContext } from '@/context/globalContext';
import React, {useState } from 'react';

const Profile = () => {
    const { user, updateUserProfile } = useGlobalContext();

    const [name, setName] = useState(user?.name || ''); 
    const [email, setEmail] = useState(user?.email || '');  
    const [currentPassword, setCurrentPassword] = useState(user?.password || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUserProfile(name, email, currentPassword, password, confirmPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full" id='contact'>
            <div className='p-20 flex items-center justify-between w-full'>
                <div className='uppercase'>
                    <span className='text-gray-400 font-medium'>HOME / <span className='text-black font-bold '>Edit Profile</span></span>
                </div>
                <div className='uppercase font-bold gap-x-[1.8px] flex'>
                    <span className='text-black'>Hola</span>,<span className='text-red-600'>{user?.name}!</span>
                </div>
            </div>
            <div className='bg-white flex flex-col shadow-lg max-w-[80%] border-2 border-gray-200 min-h-[105vh] rounded-[10px] p-12 gap-y-10'>
                <h5 className='text-red-600 font-bold text-[20px] mb-10'>Edit your profile</h5>
                <form onSubmit={handleSubmit} method='PUT'>
                    <div className="grid md:grid-rows-2 sm:grid-cols-1 gap-y-10 gap-x-4 ">
                        <div className="flex md:flex-wrap lg:flex-row flex-col justify-between items-center gap-4">
                            <div className=" flex flex-col gap-y-5 items-start">
                                <div className='flex flex-col '>
                                    <label htmlFor="name" className='text-black font-bold'>Name</label>
                                    <input
                                        name='name'
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 outline-none p-2 md:min-w-[70vh] min-w-[2vh]' placeholder='Name' />
                                </div>
                                <div className='flex flex-col '>
                                    <label htmlFor="email" className='text-black font-bold'>Email</label>
                                    <input
                                        name='email'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='focus:border-red-600 duration-400 transition-colors border-b-2 md:min-w-[70vh] min-w-[20vh] border-gray-200 outline-none p-2 ' placeholder='Email' />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <h3>Password Changes</h3>
                            <input
                                type="password"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className='focus:border-red-600 outline-none border-b-2 border-gray-200 p-2'
                                placeholder='Current Password' />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='focus:border-red-600 outline-none border-b-2 border-gray-200 p-2'
                                placeholder='New Password' />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='focus:border-red-600 outline-none border-b-2 border-gray-200 p-2'
                                placeholder='Confirm New Password' />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <button type="button" className='mt-12 px-10 font-semibold py-4 rounded-md text-black hover:bg-blue-500 duration-500 transition-colors'>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='mt-12 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
