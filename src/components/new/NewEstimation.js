import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewEstimation = () => {
    const navigate = useNavigate();
    const [estimationType, setEstimationType] = useState('points');
    const [customValue, setCustomValue] = useState('');
    const [pointValue, setPointValue] = useState('0, 1, 2, 3, 4, 5, 6, 13, ?');

    const onEstimationChange = (e) => {
        setEstimationType(e.target.value);
    };

    const onCustomInputChange = (e) => {
        setCustomValue(e.target.value);
    };

    const onPointValueChange = (e) => {
        setPointValue(e.target.value);
    };

    const handleStartEstimation = () => {
        // Functionality for starting an estimation process
        console.log('Estimation Started');
        navigate('/estimationBoard', { state: { pointValue } })
    };

    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center">New Estimation</h2>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Estimation Type</label>
                    <div className="mb-4">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="estimationType"
                                value="points"
                                checked={estimationType === 'points'}
                                onChange={onEstimationChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Points</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="estimationType"
                                value="custom"
                                checked={estimationType === 'custom'}
                                onChange={onEstimationChange}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Custom</span>
                        </label>
                    </div>

                    {estimationType === 'points' && (
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Available Points</label>
                            <input
                                type="text"
                                value={pointValue}
                                onChange={onPointValueChange}
                                className="w-full rounded-md border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {estimationType === 'custom' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Enter Formula</label>
                                <input
                                    type="text"
                                    value={customValue}
                                    onChange={onCustomInputChange}
                                    className="w-full rounded-md border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Enter Custom Value</label>
                                <input
                                    type="text"
                                    value={customValue}
                                    onChange={onCustomInputChange}
                                    className="w-full rounded-md border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleStartEstimation}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full mt-4"
                    >
                        Start Estimate
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewEstimation;
