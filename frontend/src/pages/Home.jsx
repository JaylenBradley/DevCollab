import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NavBar/>
            <Footer/>
        </div>
    );
};

export default Home;