import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChooseTeam = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTeams = () => {
    // Fetch the list of teams
    axios
      .get("http://localhost:8080/api/teams/all")
      .then((response) => {
        // Extract team names from the response
        const teams = response.data.map((team) => team.teamName);
        setTeamOptions(teams);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  };

  useEffect(() => {
    // Fetch teams when the component mounts
    fetchTeams();

    // Set up auto-refresh every 2 seconds
    const intervalId = setInterval(fetchTeams, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Reset input value when team selection changes
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreateTeam = () => {
    // You can perform actions when the "Create Team" button is clicked
    console.log("Creating team...");
    navigate("/createTeam");
  };

  const handleJoinTeam = () => {
    axios
      .post("http://localhost:8080/api/teams/validateMembership", {
        teamName: selectedOption,
        userName: inputValue.toLowerCase(),
      })
      .then((response) => {
        console.log("Validation Response:", response.data); // Log the response for debugging
        const isMember = response.data.member;
        if (isMember) {
          navigate("/userLoggedIn", {
            state: {
              teamName: selectedOption,
              userName: inputValue.toLowerCase(),
            },
          });
        } else {
          console.log("User is not a team member");
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error validating team membership:", error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Create or Join a Team
        </h2>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mb-6"
          onClick={handleCreateTeam}
        >
          Create Team
        </button>
        {teamOptions.length === 0 ? (
          <p className="text-gray-600">No teams available</p>
        ) : (
          <div className="relative">
            <select
              className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={(e) => handleOptionChange(e.target.value)}
            >
              <option disabled selected>
                Select a team
              </option>
              {teamOptions.map((team, index) => (
                <option key={index}>{team}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
        {selectedOption && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="What's your name?"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
            />
          </div>
        )}
        {selectedOption && inputValue && (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
            onClick={handleJoinTeam}
          >
            Join
          </button>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
              <p className="text-red-500 text-xl font-bold mb-4">
                You are not a team member.
              </p>
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChooseTeam;
