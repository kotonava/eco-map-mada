// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { routes } from "../../source";
import { IoIosArrowForward } from "react-icons/io";
import { perfectShape } from "../../utility";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => {
  return (
    <aside className={`sidebar ${open && "card open"}`}>
      <div className="top">
        <Logo />
        <div
          className="close-btn"
          onClick={onClose || (() => {})}
          style={{ ...perfectShape(40, 40) }}
        >
          <IoClose />
        </div>
      </div>
      <ul className="middle">
        {routes.map((route, key) => (
          <li className={`route`} key={key}>
            <NavLink
              to={route.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              end={route.path === "/"}
            >
              <div className="icon" style={{ ...perfectShape(30, 30) }}>
                <route.icon />
              </div>
              <span className="text">{route.name}</span>
              {route.sub_routes && <IoIosArrowForward className="arrow" />}
            </NavLink>
            {route.sub_routes && (
              <div className="sub-routes">
                <ul>
                  {route.sub_routes.map((sub_route, index) => (
                    <li key={index}>
                      <NavLink
                        to={sub_route.path}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <div
                          className="icon"
                          style={{ ...perfectShape(30, 30) }}
                        >
                          <sub_route.icon />
                        </div>
                        <span className="text">{sub_route.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
        {/* Déplacer ThemeToggle ici, en dehors de la boucle map */}
        <li className="route">
          <ThemeToggle />
        </li>
      </ul>
      {/* Supprimer l'ancienne div du bouton pour éviter la duplication */}
    </aside>
  );
};

export default Sidebar;