import React from 'react';
import { RxAvatar } from "react-icons/rx";
import { useAuthContext } from '../../context/AuthContext';
import LogoutButton from './LogoutButton';

const Profile = () => {
    const {authUser} = useAuthContext();

    return (
        <div>
            {authUser ? (
                <div className='flex gap-3 items-center mr-5'>
                    <img src={authUser.profilePic} alt='user avatar' className="w-10 h-10 rounded-full" />
                    <p className='font-bold text-white'>{authUser.fullName}</p>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            ) : (
                <div className='flex gap-3 items-center mr-5'>
                    <RxAvatar 
                        onClick={() => navigate('/login')}
                        className="w-10 h-10 rounded-full cursor-pointer text-white" 
                    />
                </div>
            )}
        </div>
    )
}

export default Profile
