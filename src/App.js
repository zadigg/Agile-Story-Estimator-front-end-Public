import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/new/Login";
import Dashboard from "./components/new/Dashboard";
import Signup from "./components/new/Signup";
import NewEstimation from "./components/new/NewEstimation";
import ManageTeams from "./components/new/ManageTeams";
import EstimationBoard from "./components/new/EstimationBoard";
import ChooseTeam from "./components/new/ChooseTeam";
import CreateTeam from "./components/new/CreateTeam";
import UserLoggedIn from "./components/new/UserLoggedIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Login />} />*/}
        <Route path="/" element={<ChooseTeam />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />\
        <Route path="/NewEstimation" element={<NewEstimation />} />
        <Route path="/manageTeams" element={<ManageTeams />} />\
        <Route path="/estimationBoard" element={<EstimationBoard />} />\
        {/*<Route path="/chooseTeam" element={<ChooseTeam />} />*/}
        <Route path="/createTeam" element={<CreateTeam />} />
        <Route path={'*'} element={<h1>Not Found</h1>} />
        <Route path="/userLoggedIn" element={<UserLoggedIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
