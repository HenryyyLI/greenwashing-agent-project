import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Profile from "./Profile";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar fixed flex h-[80px] items-center justify-between py-[10px] px-[25px] pr-[15px] 
        w-full bg-white-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border border-gray-100">
            <div className="tags flex items-center justify-between gap-[10px]">
                <div className="leftTag flex items-center">
                    <FaHome className="h-[24px] w-[24px]" />
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/`)}
                        className="link text-[28px] font-semibold text-black"
                    >
                        Home
                    </Button>
                </div>
                <div className="rightTag flex items-center">
                    <FaHistory className="h-[24px] w-[24px]" />
                    <Button 
                        variant="ghost"
                        onClick={() => navigate(`/history`)}
                        className="link text-[28px] font-semibold text-black"
                    >
                        History
                    </Button>
                </div>
            </div>
            <div className="profile">
                <Profile />
            </div>
        </div>
    );
};

export default Navbar;