import React from 'react';

const Header = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center">
            <div className="text-white text-3xl font-bold">BOD</div>

            <div className="flex items-center">
                <div className="mr-4">
                    <img
                        className="w-12 h-12 rounded-full border border-white shadow-sm"
                        src="https://tinyurl.com/pcn4kcfa"
                        alt="Profile"
                    />
                </div>
                <div className="text-white font-bold">{/* Your name */}</div>
            </div>
        </nav>

    );
};

export default Header;