import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiHealthBookFill } from "react-icons/ri";
import { FaHospitalUser } from "react-icons/fa";
import { MdMedicationLiquid } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/HealthRecords",
      name: "Health Records",
      icon: <RiHealthBookFill />,
    },
    {
      path: "/Appointments",
      name: "Appointments",
      icon: <FaHospitalUser />,
    },
    {
      path: "/MedTracker",
      name: "Medication Tracker",
      icon: <MdMedicationLiquid />,
    },
    {
      path: "/PatientProfile",
      name: "Profile",
      icon: <CgProfile />,
    },
    {
      path: "/Users",
      name: "Users",
      icon: <CgProfile />,
    }
  ];
  return (
    <div className="wrapper">
      <aside id="sidebar" style={{ width: isOpen ? "260px" : "50px" }}>
        <div className="d-flex">
          <button id="toggle-btn" type="button" onClick={toggle}>
            <TfiMenuAlt />
          </button>
          <div
            className="sidebar-head"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <p>Patient Dashboard</p>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index}>
                <div className="menuItems">
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </div>
              </NavLink>
            ))}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
