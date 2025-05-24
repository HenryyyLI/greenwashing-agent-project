import React from 'react';
import Profile from "./Profile";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    return (
        <div className="navbar fixed flex h-[100px] items-center justify-between z-100 py-[10px] px-[25px] pr-[15px] 
        w-full bg-[#059669] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <div className="tags flex items-center justify-between gap-[10px]">
                <div className="leftTag flex flex-col items-left">
                    <h1 className="text-4xl font-semibold mb-2 text-white">GreenTruth</h1>
                    <p className="text-white">
                        AI-powered tool for greenwashing claim detection and rewriting — text, PDF and DOC supported
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-[#33DB5B] hover:bg-[#28b34a] cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-white">
                    <FaHome 
                        onClick={() => navigate(`/`)} 
                        className="h-[28px] w-[28px]" 
                    />
                </div>
                <div className="bg-[#33DB5B] hover:bg-[#28b34a] cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-white">
                    <FaHistory 
                        onClick={() => navigate(`/history`)}
                        className="h-[25px] w-[25px]" 
                    />
                </div>
                <div className="profile">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Navbar;