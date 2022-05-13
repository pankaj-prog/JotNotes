import React from "react";

const IconButton = ({ icon, name, clickHandler }) => {
  return (
    <div className="icon-btn-wrapper">
      <button className="btn text-lg" onClick={(e) => clickHandler(e)}>
        {icon}
      </button>
      <span className="name">{name}</span>
    </div>
  );
};

export default IconButton;
