import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        console.log('handleSignIn');
        navigate('/dashboard');
    };

    const handleSignUp = () => {
        console.log('handleSignUp');
        navigate('/signup');
    };

    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-3xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign in to your account</h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500">
                        Don’t have an account yet?{' '}
                        <button onClick={handleSignUp} className="text-blue-500">
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
