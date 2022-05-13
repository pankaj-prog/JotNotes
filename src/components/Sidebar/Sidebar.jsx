import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "All Notes", pathName: "/user" },
  { name: "Archive", pathName: "/user/archive" },
  { name: "Trash", pathName: "/user/trash" },
];

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        {links.map((link) => {
          return (
            <li>
              <NavLink to={link.pathName}>{link.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
