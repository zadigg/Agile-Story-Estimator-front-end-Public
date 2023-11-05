import React, { useState } from "react";
import Axios from "axios";


const WhoisThis = () => {
    const [username, setUsername] = useState(""); // Initialize state for the input value
    const [error, setError] = useState("");

    const handleCheckIn = (username) => {
        Axios.get(`http://localhost:8080/checks/checkin/${username}`)
            .then((response) => {
                // if the response is 200 to go to Home component or to show error message, i installed react-router-dom

                if (response.status === 200) {
                    window.location.href = `/home?username=${username}`;
                } else {
                    setError("Error: Unable to check in.");
                    console.log("error");
                }
                console.log(response.data);
            })
            .catch((error) => {
                // Handle API request errors here
                setError("Error: Unable to check in.");
                console.error(error);
            });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <h1 className="text-3xl font-bold text-white mb-4">Who is this?</h1>

            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Enter a name"
                    className="appearance-none border-none rounded-lg bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={username} // Set input value from state
                    onChange={(e) => setUsername(e.target.value)} // Update state on input change
                />
                    <button
                        className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-sm hover:bg-purple-700"
                        onClick={() => handleCheckIn(username)} // Pass the input value to the handler
                    >
                        Check In
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </section>
    );
};

export default WhoisThis;
