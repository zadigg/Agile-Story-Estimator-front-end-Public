import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageTeams = () => {
  const navigate = useNavigate();
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
    const hasEmptyDeveloper = developers.some((dev) => dev.name.trim() === "");

    if (hasEmptyDeveloper) {
      alert(
        "Developer name cannot be empty. Please fill in all developer names.",
      );
      return; // Prevents the update if there are empty developer names
    }

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

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className=" sticky bg-gradient-to-r from-gray-800 to-gray-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wider">Your App Name</h1>
        <button
          onClick={handleGoToHomePage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
        >
          Home
        </button>
      </header>
      <section className="bg-gradient-to-r from-gray-800 to-gray-600 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-[600px] overflow-y-auto">
          {teamData ? (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                Manage Teams
              </h2>
              <form className="space-y-4">
                {/* ... (previous code remains the same) */}
                {/* Section for Managers */}
                <div className="mb-4">
                  <label className="text-gray-600 block mb-2">Manager</label>
                  <input
                    type="text"
                    placeholder="Manager Name"
                    value={manager.name}
                    onChange={(e) =>
                      setManager({ ...manager, name: e.target.value })
                    }
                    className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
                  />
                </div>

                {/* Section for Product Owners */}
                <div className="mb-4">
                  <label className="text-gray-600 block mb-2">
                    Product Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Product Owner Name"
                    value={productOwner.name}
                    onChange={(e) =>
                      setProductOwner({ ...productOwner, name: e.target.value })
                    }
                    className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm"
                  />
                </div>

                {/* Section for Scrum Masters */}
                <div className="mb-4">
                  <label className="text-gray-600 block mb-2">
                    Scrum Master
                  </label>
                  <input
                    type="text"
                    placeholder="Scrum Master Name"
                    value={scrumMaster.name}
                    onChange={(e) =>
                      setScrumMaster({ ...scrumMaster, name: e.target.value })
                    }
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
                        value={developer.name}
                        onChange={(e) =>
                          setDevelopers((prevDevelopers) =>
                            prevDevelopers.map((dev, i) =>
                              i === index
                                ? { ...dev, name: e.target.value }
                                : dev,
                            ),
                          )
                        }
                        className="w-full p-3 text-gray-600 bg-gray-100 border rounded-md shadow-sm mr-2"
                      />
                      <button
                        className="bg-red-500 text-white font-bold py-2 px-3 rounded"
                        onClick={() =>
                          setDevelopers(
                            developers.filter((_, i) => i !== index),
                          )
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type={"button"}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
                    onClick={() =>
                      setDevelopers((prevDevelopers) => [
                        ...prevDevelopers,
                        { name: "", status: "INACTIVE", score: 0 },
                      ])
                    }
                  >
                    + Add Developer
                  </button>
                </div>

                <button
                  type={"button"}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={updateTeam}
                >
                  Update Team
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Team not found. Please select a valid team to manage.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageTeams;
