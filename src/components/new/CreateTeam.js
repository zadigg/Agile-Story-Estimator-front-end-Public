import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import axios
import axios from "axios";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [manager, setManager] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [developers, setDevelopers] = useState([""]); // Initial state with one developer
  const [inputValue, setInputValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddDeveloper = () => {
    setDevelopers([...developers, ""]);
  };

  const handleRemoveDeveloper = (index) => {
    const newDevelopers = [...developers];
    newDevelopers.splice(index, 1);
    setDevelopers(newDevelopers);
  };

  const handleCreateTeam = async () => {
    try {
      const teamData = {
        teamName: teamName.toLowerCase(),
        manager: manager.toLowerCase(),
        productOwner: productOwner.toLowerCase(),
        scrumMaster: scrumMaster.toLowerCase(),
        developers: developers.map((developer) => ({
          name: developer.toLowerCase(),
          status: "Active",
        })),
      };

      const response = await axios.post(
        "http://localhost:8080/api/teams/create",
        teamData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Team created successfully:", response.data);

      // Show success modal
      setShowSuccessModal(true);

      // Optionally, you can set a timeout to hide the modal after a few seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/");
      }, 3000); // Adjust the timeout as needed
    } catch (error) {
      console.error(
        "Error creating team:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  const closeModal = () => {
    // Close the success modal
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-[600px] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Create Team
        </h2>
        <div className="mb-4">
          <label className="text-gray-600 block mb-2">Team Name</label>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 block mb-2">Manager</label>
          <input
            type="text"
            placeholder="Manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 block mb-2">Scrum Master</label>
          <input
            type="text"
            placeholder="Scrum Master"
            value={scrumMaster}
            onChange={(e) => setScrumMaster(e.target.value)}
            className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 block mb-2">Product Owner</label>
          <input
            type="text"
            placeholder="Product Owner"
            value={productOwner}
            onChange={(e) => setProductOwner(e.target.value)}
            className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 block mb-2">Developers</label>
          {developers.map((developer, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                placeholder={`Developer ${index + 1}`}
                value={developer}
                onChange={(e) => {
                  const newDevelopers = [...developers];
                  newDevelopers[index] = e.target.value;
                  setDevelopers(newDevelopers);
                }}
                className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm mr-2"
              />
              <button
                className="bg-red-500 text-white font-bold py-2 px-3 rounded"
                onClick={() => handleRemoveDeveloper(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
            onClick={handleAddDeveloper}
          >
            + Add Developer
          </button>
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleCreateTeam}
        >
          Create Team
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-green-500 text-lg font-semibold mb-4">
              Team successfully added!
            </p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateTeam;
