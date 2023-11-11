import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        console.log('handleSignup');
        navigate('/dashboard');
    }
    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-3xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your First Name"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="teamName" className="block text-gray-700 font-medium mb-2">
                            Team Name
                        </label>
                        <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Team Name"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Password"
                        />
                    </div>
                    <button onClick={() => {handleSignup()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Signup;
