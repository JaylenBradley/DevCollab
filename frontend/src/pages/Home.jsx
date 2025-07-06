import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const roles = ["Fullstack", "Backend", "Frontend", "Machine Learning", "Mobile"];

const Home = () => {
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // start fade out
            setTimeout(() => {
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setFade(true); // fade in new word
            }, 400); // fade out duration
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-10">
            <div className="bg-card-big flex flex-col items-center w-250 h-150 rounded-3xl py-10">
                <p className="text-white font-bold text-6xl">
                    Find Your Next
                </p>
                <p className={`text-gradient font-bold text-6xl py-4 transition-opacity 
                    duration-400 ${fade ? "opacity-100" : "opacity-0"}`}
                >
                    {roles[roleIndex]}
                </p>
                <p className="text-white font-bold text-6xl mb-5">
                    Project
                </p>
                <p className="text-white text-2xl font-semibold">
                    Join a growing community of developers and teams
                </p>

                <div className="flex flex-1 items-center justify-center space-x-5 w-full my-8">
                    <div className="bg-card-small flex flex-col items-center justify-center w-55 h-25 text-white rounded-3xl">
                        <p className="text-gradient font-bold text-3xl">1,000+</p>
                        <p className="text-white font-bold text-lg ">Projects</p>
                    </div>
                    <div className="bg-card-small flex flex-col items-center justify-center w-55 h-25 text-white rounded-3xl">
                        <p className="text-gradient font-bold text-3xl">200+</p>
                        <p className="text-white font-bold text-lg ">Users</p>
                    </div>
                    <div className="bg-card-small flex flex-col items-center justify-center w-55 h-25 text-white rounded-3xl">
                        <p className="text-gradient font-bold text-3xl">50+</p>
                        <p className="text-white font-bold text-lg ">Teams</p>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button className="bg-main-gradient rounded-full inline-flex items-center justify-center
                    font-bold text-white text-2xl px-9 py-5"
                    onClick={() => navigate('projects')}>
                        Browse projects now
                        <HiOutlineArrowLongRight className="text-3xl ml-2"/>
                    </button>
                    {!signedIn && (
                        <button
                            className="bg-main-gradient rounded-full inline-flex items-center justify-center
                            font-bold text-white text-2xl px-9 py-5"
                            onClick={() => navigate('/signup')}
                        >
                            Sign up
                            <FiUserPlus className="ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;