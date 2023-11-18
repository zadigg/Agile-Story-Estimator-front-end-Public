import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ManageTeams = () => {
  const location = useLocation();
  const teamName = location.state?.teamName;
  const [teamData, setTeamData] = useState(null);
  const [manager, setManager] = useState({ name: "", status: "", score: 0 });
  const [productOwner, setProductOwner] = useState({
    name: "",
    status: "",
    score: 0,
  });
  const [scrumMaster, setScrumMaster] = useState({
    name: "",
    status: "",
    score: 0,
  });
  const [developers, setDevelopers] = useState([]);

  // Fetch team data when the component mounts
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/teams/find/${teamName}`,
        );
        setTeamData(response.data);

        // Extract team member details
        const { manager, productOwner, scrumMaster, developers } =
          response.data;

        setManager(manager);
        setProductOwner(productOwner);
        setScrumMaster(scrumMaster);
        setDevelopers(developers);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [teamName]);

  // Update team information
  const updateTeam = async () => {
    const updatedTeam = {
      teamName,
      manager,
      productOwner,
      scrumMaster,
      developers,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/teams/update/${teamData.id}`,
        updatedTeam,
      );
      alert("Team information updated successfully!");
    } catch (error) {
      console.error("Error updating team information:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-6 py-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Manage Teams
      </h2>
      {teamData && (
        <form className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Team Name
            </label>
            <p className="bg-white p-3 rounded shadow-md">
              {teamData.teamName}
            </p>
          </div>

          {/* Add similar sections for Manager, Product Owner, and Scrum Master */}

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Developers
            </label>
            {developers.map((developer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={developer.name}
                  onChange={(e) =>
                    setDevelopers((prevDevelopers) =>
                      prevDevelopers.map((dev, i) =>
                        i === index ? { ...dev, name: e.target.value } : dev,
                      ),
                    )
                  }
                  className="w-40 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDevelopers((prevDevelopers) =>
                      prevDevelopers.filter((dev, i) => i !== index),
                    )
                  }
                  className="text-red-500 font-bold px-4 py-2 rounded hover:bg-red-200 focus:outline-none focus:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDevelopers((prevDevelopers) => [
                  ...prevDevelopers,
                  { name: "", status: "INACTIVE", score: 0 },
                ])
              }
              className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            >
              Add Developer
            </button>
          </div>

          <button
            type="button"
            onClick={updateTeam}
            className="bg-blue-500 text-white font-bold px-6 py-3 rounded hover:bg-blue-600 focus:outline-none"
          >
            Update Team
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageTeams;
