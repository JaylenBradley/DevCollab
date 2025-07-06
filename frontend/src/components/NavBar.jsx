import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/NavButton.jsx";
import DevCollabLogo from "../images/DevCollab-logo.png"
import { TbHome } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";

const NavBar = () => {
    const navigate = useNavigate();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-8">
            <div className="text-3xl text-gradient flex items-center font-bold">
                <img src={DevCollabLogo} alt="DevCollab logo" className="w-20 h-auto"/>
                DevCollab
            </div>
            <ul className="flex space-x-6">
                <li>
                    <NavButton
                        onClick={() => navigate('/')}
                        image={TbHome}
                        text="Home"
                    />
                </li>
                <li>
                    <NavButton
                        onClick={() => navigate('/projects')}
                        image={IoIosGitBranch}
                        text="Projects"
                    />
                </li>
                <li>
                    <button
                        className="bg-main-gradient text-white w-10 h-10 flex items-center justify-center rounded-full"
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    >
                        <IoPersonOutline size={24}/>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;