import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNewEstimation = () => {
        navigate('/NewEstimation');
    }

    const handleManageTeams = () => {
        navigate('/manageTeams');
    }
    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-3xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
                <div className="flex flex-col gap-4">
                    <button onClick={() => {handleNewEstimation()}}  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center">
                        Start New Estimation
                    </button>
                    <button onClick={() => {handleManageTeams()}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center">
                        Manage Teams
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
