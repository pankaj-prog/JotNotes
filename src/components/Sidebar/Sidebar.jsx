import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineNotes } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";

import "./Sidebar.css";
import { IconButton } from "components";

const links = [
  {
    _id: 1,
    name: "All Notes",
    pathName: "/user/allnotes",
    icon: <MdOutlineNotes />,
  },
  {
    _id: 2,
    name: "Archive",
    pathName: "/user/archive",
    icon: <IoArchiveOutline />,
  },
  { _id: 3, name: "Trash", pathName: "/user/trash", icon: <AiOutlineDelete /> },
];

const Sidebar = ({ setShowSidebar }) => {
  const clickHandler = (e) =>
    e.target.tagName == "NAV" && setShowSidebar(false);

  return (
    <nav className="sidebar-wrapper" onClick={clickHandler}>
      <div className="sidebar">
        <header className="border-bottom">
          <IconButton
            icon={<AiOutlineClose />}
            clickHandler={() => setShowSidebar(false)}
          />
        </header>
        <ul>
          {links.map((link) => {
            return (
              <li key={link._id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-sidebar-link link sidebar-link text-lg"
                      : "link sidebar-link text-lg"
                  }
                  to={link.pathName}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
