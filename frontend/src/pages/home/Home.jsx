import React from 'react';
import LeftCard from '../../components/Cards/LeftCard';
import RightCard from '../../components/Cards/RightCard';

const Home = () => {
    return (
        <div className="mt-[85px] min-h-screen bg-[#ECFDF5]">
            <div className="max-w-6xl mx-auto p-8 flex flex-col lg:flex-row gap-4">
                <LeftCard />
                <RightCard />
            </div>
        </div >
    );
}

export default Home