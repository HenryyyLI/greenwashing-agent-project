import React from 'react';
import RightCard from '../../components/Cards/RightCard';
import HistoryCard from '../../components/Cards/HistoryCard';

const History = () => {
    return (
        <div className="mt-[85px] min-h-screen bg-[#ECFDF5]">
            <div className="max-w-6xl mx-auto p-8 flex flex-col lg:flex-row gap-4">
                <HistoryCard />
                <RightCard />
            </div>
        </div >
    )
}

export default History
