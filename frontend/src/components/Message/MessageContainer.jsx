import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const MessageContainer = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage("");
    }

    return (
        <form className="bottom flex h-1/3 justify-center mt-[10px]" onSubmit={handleSubmit}>
            <div className="flex flex-col w-[60%] gap-[10px]">
                <Textarea 
                    placeholder="Type your message here." 
                    className="placeholder:text-[16px] h-full bg-gray-100"
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                />
                <div className="flex items-center justify-end gap-[5px]">
                    <Button 
                        className="text-[14px] font-semibold bg-white text-black cursor-pointer"
                        onClick={() => setMessage('')}
                    >
                        Reset
                    </Button>
                    <Button className="text-[14px] font-semibold bg-[#1A77F2] text-white border-[#005fd8] cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-lg"></span> : <BsSend className="text-white cursor-pointer" />}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default MessageContainer
