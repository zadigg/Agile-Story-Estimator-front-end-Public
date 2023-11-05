import React from "react";

const UserCard = ({ users }) => {
    const topUsers = users.slice(0, 4);
    const bottomUsers = users.slice(4);

    return (
        <div className="max-w-5xl mx-auto mt-44">
            <div className="flex flex-wrap justify-center space-x-3">
                {topUsers.map((user) => (
                    <div
                        key={user.id}
                        className="w-28 h-40 rounded-lg shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 p-4 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold text-white mb-2">{user.username}</h2>
                        {/* Add more user information here if needed */}
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full">
                    Reveal
                </button>
            </div>
            <div className="flex flex-wrap justify-center space-x-3 mt-4">
                {bottomUsers.map((user) => (
                    <div
                        key={user.id}
                        className="w-28 h-40 rounded-lg shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 p-4 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold text-white mb-2">{user.username}</h2>
                        {/* Add more user information here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserCard;
