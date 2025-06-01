import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className="min-h-screen bg-[#ECFDF5] flex items-center justify-center">
            <div className='mt-[40px] h-[100vh] flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        <span className='text-blue-500'>Login</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-[5px]">
                            <Label htmlFor="username">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Username</span>
                            </Label>
                            <Input type='text' id='username' placeholder='Enter username' className='w-full h-10'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Password</span>
                            </Label>
                            <Input type='password' id='password' placeholder='Enter password' className='w-full h-10'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to='/signup' className='ml-[5px] text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400'>
                            {"Don't"} have an account?
                        </Link>

                        <div>
                            <Button className="bg-[#1A77F2] text-white border-[#005fd8] shadow-none mt-2 w-[100%] cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner loading-lg"></span> : "Login"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login