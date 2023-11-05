import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import UserCard from "./UserCard";

const Home = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");

    const fetchData = async () => {
        try {
            const response = await Axios.get("http://localhost:8080/checks/all");
            setActiveUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const interval = setInterval(() => {
            fetchData(); // Fetch data every minute
        }, 10); // Adjust the interval as needed

        // Clear the interval on unmount to prevent memory leaks
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Header />
            <h1>Welcome, {username}!</h1>

            <UserCard users={activeUsers} />
            {/* The rest of your home page content */}
        </div>
    );
};

export default Home;
