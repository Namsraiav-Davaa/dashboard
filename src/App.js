import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";
import Orders from "./pages/Orders";
import SignIn from "./pages/loginPage/login";
import SignUp from "./pages/register";
import { UserContext } from "./userContext";
import Users from "./pages/users";

function App() {
  const { user } = useContext(UserContext);
  console.log("user :>> ", user);
  return (
    <Router>
      <div className="dashboard-container">
        {user !== null && <SideBar menu={sidebar_menu} />}

        <div className="dashboard-body">
          {user === null ? (
            <Routes>
              {/* <Route path="*" element={<div></div>} /> */}
              {/* <Route exact path="/" element={<div></div>} /> */}
              <Route exact path="/" element={<SignIn />} />
              <Route exact path="/login" element={<SignIn />} />
              <Route exact path="/signUp" element={<SignUp />} />
              {/* <Route exact path="/locations" element={<div></div>} /> */}
              {/* <Route exact path="/profile" element={<div></div>} /> */}
            </Routes>
          ) : (
            <Routes>
              {/* <Route path="*" element={<div></div>} /> */}
              {/* <Route exact path="/" element={<div></div>} /> */}
              <Route exact path="/" element={<Orders />} />
              <Route exact path="/users" element={<Users />} />
              {/* <Route exact path="/profile" element={<div></div>} /> */}
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
