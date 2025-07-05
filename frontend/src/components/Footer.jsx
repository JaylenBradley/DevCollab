import React from "react";
import DevCollabLogo from "../images/DevCollab-logo.png"

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl text-gradient flex items-center justify-center font-bold">
                <img src={DevCollabLogo} alt="DevCollab logo" className="w-20 h-auto"/>
                DevCollab
            </div>
            <div className="text-gray-600 py-3 ml-3">
                DevCollab<sup className="text-sm">™</sup> by Jaylen Bradley
            </div>
        </div>
    )
};

export default Footer;