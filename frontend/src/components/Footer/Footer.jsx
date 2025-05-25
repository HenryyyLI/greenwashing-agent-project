import React from 'react';

const Footer = () => {
    return (
        <div className="bg-[#059669]">
            <div className="footer my-[100px] mx-[200px] mb-[20px]">
                <div className="top flex gap-[50px]">
                    <div className="item flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                        <h1 className="text-[18px] font-medium text-white">Links</h1>
                        <span className="text-white">FAQ</span>
                        <span className="text-white">Pages</span>
                        <span className="text-white">Stores</span>
                        <span className="text-white">Compare</span>
                        <span className="text-white">Cookies</span>
                    </div>
                    <div className="item flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                        <h1 className="text-[18px] font-medium text-white">About</h1>
                        <span className="text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto a vitae nemo corporis libero totam, recusandae sed non excepturi tempora vel voluptatem quam debitis, dolores accusamus! Quasi a dolor voluptatem?
                        </span>
                    </div>
                    <div className="item flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                        <h1 className="text-[18px] font-medium text-white">Contact</h1>
                        <span className="text-white">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit delectus, repellat in laboriosam sunt est impedit reiciendis quae eius magnam temporibus quibusdam magni maxime. Ut quos voluptate nihil iure amet!
                        </span>
                    </div>
                </div>
                <div className="bottom flex items-center justify-between mt-[20px]">
                    <div className="left flex items-center">
                        <span className="copyright text-[12px] text-white">
                            © Yuhong LI 2025. All Rights Reserved.
                        </span>
                    </div>
                    <div className="right">
                        <img src="/img/payment.png" alt="" className="h-[50px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;