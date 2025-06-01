import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import useSignUp from '../../hooks/useSignUp'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const { loading, signup } = useSignUp();

    const handleCheckBoxChange = (gender) => {
        setInputs({...inputs, gender: gender})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(inputs);
        await signup(inputs);
    }

    return (
        <div className="min-h-screen bg-[#ECFDF5] flex items-center justify-center">
            <div className='mt-[40px] h-[100vh] flex flex-col items-center justify-center min-w-96 mx-auto bg-[#ECFDF5]'>
                <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        <span className='text-blue-500'>Sign Up</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-[5px]">
                            <Label htmlFor="fullName">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Full Name</span>
                            </Label>
                            <Input type='text' id='fullName' placeholder='Enter full name' className='w-full h-10'
                                value={inputs.fullName}
                                onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                            />
                        </div>
                        
                        <div className="mb-[5px]">
                            <Label htmlFor="username">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Username</span>
                            </Label>
                            <Input type='text' id='username' placeholder='Enter username' className='w-full h-10'
                                value={inputs.username}
                                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                            />
                        </div>

                        <div className="mb-[5px]">
                            <Label htmlFor="password">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Password</span>
                            </Label>
                            <Input type='password' id='password' placeholder='Enter password' className='w-full h-10'
                                value={inputs.password}
                                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                            />
                        </div>

                        <div className="mb-[5px]">
                            <Label htmlFor="confirmPassword">
                                <span className='text-base label-text text-black mb-[5px] ml-[5px]'>Confirm Password</span>
                            </Label>
                            <Input type='password' id='confirmPassword' placeholder='Confirm password' className='w-full h-10'
                                value={inputs.confirmPassword}
                                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                            />
                        </div>

                        <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

                        <Link to='/login' className='ml-[5px] text-sm hover:underline hover:text-blue-600 mt-4 inline-block text-gray-400'>
                            Already have an account?
                        </Link>

                        <div>
                            <Button className="bg-[#1A77F2] text-white border-[#005fd8] shadow-none mt-2 w-[100%] cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner loading-lg"></span> : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
