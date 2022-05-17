import React from "react";

const IconButton = ({ icon, name, clickHandler, blurHandler }) => {
  return (
    <div className="icon-btn-wrapper">
      <button
        className="btn text-lg"
        onClick={clickHandler}
        onBlur={blurHandler}
      >
        {icon}
      </button>
      <span className="name">{name}</span>
    </div>
  );
};

export default IconButton;
