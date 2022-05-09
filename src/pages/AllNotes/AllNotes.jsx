import React from "react";
import { useAuth } from "context";

const AllNotes = () => {
  const { setEncodedToken } = useAuth();
  const logoutHandler = () => {
    localStorage.removeItem("encodedToken");
    setEncodedToken(null);
  };
  return (
    <div>
      All Notes: userRoute <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default AllNotes;
