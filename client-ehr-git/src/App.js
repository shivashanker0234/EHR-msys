import React from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,useEffect } from "react";
import MedTracker from "./components/MedTracker/MedTracker";
import HealthRecords from "./components/HealthRecords/HealthRecords";
import Appointments from "./components/Appointments/Appointments";
import PatientProfile from "./components/Profile/PatientProfile";
import Users from "./components/Users/Users";
import UpdateHealthRecord from './components/HealthRecords/UpdateHealthRecord';
import Cookies from "js-cookie";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState([]);
  useEffect(() => {
    // const user_id = Cookies.get("user_id");
    // const role = Cookies.get("role");
    const user_id=5
    const role='provider'

    if (user_id && role) {
      setAuthenticatedUser({ user_id, role });
    }
  }, []);

  const PrivateRoute = ({ element, ...rest }) => {
    return authenticatedUser ? (
      React.cloneElement(element, {
        user_id: authenticatedUser.user_id,
        role: authenticatedUser.role,
      })
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <div className="main-app-container">
          <Routes>
            {/* <Route path="/HealthRecords" element={<HealthRecords />} /> */}
            <Route path="/Appointments" element={<Appointments />} />
            <Route path="/MedTracker" element={<MedTracker />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/Users" element={<Users />} />
            <Route
                path="/HealthRecords"
                element={
                  <PrivateRoute
                    element={
                      <HealthRecords
                        user_role={authenticatedUser.role}
                        user_id={authenticatedUser.user_id}
                      />
                    }
                  />
                }
              />
            <Route path="/UpdateHealthRecord" element={<UpdateHealthRecord/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
