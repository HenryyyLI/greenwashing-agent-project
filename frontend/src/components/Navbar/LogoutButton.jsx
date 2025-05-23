import React from 'react';
import { BiLogOut } from "react-icons/bi";
import useLogOut from '../../hooks/useLogOut';

const LogoutButton = () => {
    const { loading, logout } = useLogOut();

    return (
        <div className='mt-auto'>
            {!loading ? (
                <BiLogOut className='w-6 h-6 text-black cursor-pointer'
                    onClick={logout}
                />
            ) : (<span className="loading loading-spinner loading-lg"></span>)}
        </div>
    )
}

export default LogoutButton
