import React, {useState, useContext} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import File from '../../components/File/File';

const Home = () => {
    return (
        <div className="home h-[calc(100vh-40px)] flex flex-col m-[20px] pt-[80px]">
            <div className="top flex justify-between h-2/3 mb-[10px] gap-[10px]">
                <File />
                <div className="right w-3/5">
                    <Card className="h-full"></Card>
                </div>
            </div>
        </div>
    )
}

export default Home