import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FingerprintSpinner } from "react-epic-spinners";
import MemberStatus from "../../enums/MemberStatus";

const UserLoggedIn = () => {
  const location = useLocation();
  const userName = location.state?.userName;
  const teamName = location.state?.teamName;
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedEstimation, setSelectedEstimation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [calculationDone, setCalculationDone] = useState(false);

  const toggleEstimationReveal = async (teamName, reveal) => {
    try {
      await axios.put(
        `http://localhost:8080/api/teams/${teamName}/showEstimations`,
        { reveal },
      );
      console.log("Estimation reveal status updated");
    } catch (error) {
      console.error("Error updating estimation reveal status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.put(
          `http://localhost:8080/api/teams/updateStatus/active/${teamName}/users/${userName}`,
        );
        const response = await axios.get(
          `http://localhost:8080/api/teams/find/${teamName}`,
        );
        const { manager, productOwner, scrumMaster, developers } =
          response.data;

        const spectators = [
          { name: manager.name, status: manager.status, score: manager.score },
          {
            name: productOwner.name,
            status: productOwner.status,
            score: productOwner.score,
          },
          {
            name: scrumMaster.name,
            status: scrumMaster.status,
            score: scrumMaster.score,
          },
        ];

        const activePlayers = developers
          .filter((dev) => dev.status === MemberStatus.ACTIVE)
          .map((dev) => ({
            name: dev.name,
            status: dev.status,
            score: dev.score,
          }));

        setTeamMembers([...spectators, ...activePlayers]);
        setLoading(false); // Data fetched, loading complete
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false); // Error occurred, loading complete
      }
    };

    const intervalId = setInterval(fetchData, 100);

    return () => clearInterval(intervalId);
  }, [teamName, userName]);

  useEffect(() => {
    const handleUnload = async () => {
      try {
        await axios.put(
          `http://localhost:8080/api/teams/updateStatus/inactive/${teamName}/users/${userName}`,
        );
      } catch (error) {
        console.error("Error updating user status to inactive:", error);
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      handleUnload();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userName, teamName]);

  const updateScore = async (userName, score) => {
    try {
      await axios.put(
        `http://localhost:8080/api/teams/${teamName}/users/${userName}/score/${score}`,
      );
      console.log(`Score updated successfully for user: ${userName}`);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleEstimationSelection = (number) => {
    setSelectedEstimation(number);
    updateScore(userName, number);
  };

  const calculateDisagreementLevel = () => {
    const nonZeroScores = teamMembers.filter((member) => member.score !== 0);
    const averageScore = calculateAverageScore();
    const total = nonZeroScores.reduce((acc, member) => {
      return acc + Math.abs(member.score - averageScore);
    }, 0);
    const disagreementLevel = total / nonZeroScores.length;

    if (disagreementLevel <= 1) {
      return "Low";
    } else if (disagreementLevel <= 2) {
      return "Medium";
    } else {
      return "High";
    }
  };

  const handleRevealEstimations = async () => {
    setShowResults(true);
    toggleEstimationReveal(teamName, true);
    console.log("Estimation revealed:", selectedEstimation);

    if (!calculationDone) {
      console.log("Calculating disagreement level...");
      const level = calculateDisagreementLevel();
      console.log("Disagreement Level:", level);
      setCalculationDone(true);
    }
  };

  const calculateAverageScore = () => {
    const nonZeroScores = teamMembers.filter((member) => member.score !== 0);
    const total = nonZeroScores.reduce((acc, member) => acc + member.score, 0);
    return total / nonZeroScores.length || 0;
  };

  const fibonacciNumbers = [0, 1, 2, 3, 5, 8, 13, 21];

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleResetEstimations = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/teams/${teamName}/resetEstimates`,
      );
      setShowResults(false);
      console.log("Estimations reset successfully");
    } catch (error) {
      console.error("Error resetting estimations:", error);
      if (error.response.status === 404) {
        console.log("Team not found");
      }
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {userName} {showResults}!
        </h1>
        <div className="space-x-3">
          <button
            onClick={handleResetEstimations}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded bg-red-600"
          >
            Reset Estimations
          </button>
          <button
            onClick={handleRevealEstimations}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Reveal Estimations
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96 p-8">
          <FingerprintSpinner color="green" />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`card p-2 rounded-lg shadow-md ${
                    member.status === "Player" ? "bg-white" : "bg-gray-200"
                  } ${member.score !== 0 ? "bg-blue-400 text-gray-100" : ""}`}
                >
                  <h2 className="text-lg font-bold mb-1">
                    {formatName(member.name)}
                  </h2>
                  <span className="text-gray-500 text-xs">{member.status}</span>
                  <span
                    className={`text-gray-500 text-xs ml-2 ${
                      member.score !== 0 ? "text-blue-700" : ""
                    }`}
                  >
                    {member.score}
                  </span>
                </div>
              ))}

              <div className="md:col-span-3">
                <div className="flex flex-wrap gap-4 justify-center">
                  {fibonacciNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleEstimationSelection(number)}
                      className={`estimation-button bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-300 w-full md:w-auto`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:w-1/3">
              {!showResults && (
                <div className="w-full bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold mb-4">Estimation Results</h2>
                  <p>No data available</p>
                </div>
              )}

              {showResults && teamMembers.length > 0 && (
                <div className="w-full bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold mb-4">Estimation Results</h2>
                  <p>Average Score: {calculateAverageScore()}</p>
                  <p>
                    Disagreement Level: {calculateDisagreementLevel()}{" "}
                    {calculateDisagreementLevel() === "High" && (
                      <span role="img" aria-label="warning">
                        ⚠️
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserLoggedIn;
