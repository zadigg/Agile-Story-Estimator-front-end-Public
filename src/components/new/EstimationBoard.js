import React from 'react';
import { useLocation } from 'react-router-dom';

const EstimationBoard = () => {
    const location = useLocation();
    const pointValue = location.state.pointValue;
    const pointList = pointValue.split(',');

    return (
        <div className="h-screen flex flex-col bg-gray-100 max-w-6xl mx-auto mt-8 max-h-[800px] bg-gradient-to-l ">
            <header className="bg-green-500 text-white flex justify-between p-4">
                <div>BOD</div>
                <div>Zadig</div>
            </header>
            <div className="flex items-center justify-center mt-4">
                {pointList.map((point, index) => (
                    <button
                        key={index}
                        className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-lg m-1 transition duration-300"
                    >
                        {point.trim()}
                    </button>
                ))}
            </div>
            <div className="flex justify-between my-14 m-6">
                <button className="bg-blue-500 text-white rounded-lg py-2 px-4">Reveal Votes</button>
                <button className="bg-red-500 text-white rounded-lg py-2 px-4">Reset Estimation</button>
            </div>
            <div className="m-6 my-6 flex ">
                <table className="table-auto inline text-left ">
                    <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th className="w-1/2 ">Players</th>
                        <th className="w-1/2">Voting Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-200 hover:text-white dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td>1</td>
                        <td>Zadig</td>
                        <td>Not Voted</td>
                    </tr>
                    </tbody>
                </table>
                <div className="ml-auto bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">Estimation Results</h2>
                    <p className="mb-2">Average: <span className="bg-green-500 px-4 py-1 rounded-2xl">1</span></p>
                    <p className="mb-2">Disagreement: <span className="bg-green-500 px-4 py-1 rounded-2xl">Low</span></p>
                    <p className="mb-2">Vote Summary</p>
                    <p><span className="bg-green-500 px-4 py-1 rounded-2xl">1 vote for 1 point</span></p>
                </div>
            </div>
        </div>
    );
};

export default EstimationBoard;
