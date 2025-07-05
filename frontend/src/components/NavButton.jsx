import React from "react";

const NavButton = ({ onClick, image: Image, text }) => {
    return (
        <div className="flex justify-center">
            <button
                className="flex items-center bg-main-gradient rounded-xl text-sm px-4 py-2 text-neutral-200"
                onClick={onClick}
            >
                {Image && <Image className="mr-2 text-lg"/>}
                {text}
            </button>
        </div>
    );
};

export default NavButton;