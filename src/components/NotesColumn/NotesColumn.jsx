import React, { useState } from "react";
import { IconButton, NoteListSection, Sidebar } from "components";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "context";

const NotesColumn = ({ notesList, currentPageName }) => {
  const { setEncodedToken } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("encodedToken");
    setEncodedToken(null);
  };

  return (
    <>
      <aside className="notes-column">
        <header className="notes-column-header border-bottom ">
          <IconButton
            icon={<AiOutlineMenu />}
            clickHandler={() => setShowSidebar(true)}
          />
          <p className="fw-b notes-column-title ">All Notes</p>
        </header>
        {currentPageName == "allNotes" && (
          <section className="new-note border-bottom padding-default">
            <button className="btn text-btn">
              <span className="text-lg">
                <AiOutlinePlus />
              </span>
              Create New Note
            </button>
          </section>
        )}
        <NoteListSection notesList={notesList} />
        <section className="user-wrapper padding-default">
          <h4>Pankaj Wadhwani</h4>
          <button
            className="btn btn-solid-primary btn-rc logout-btn"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </section>
        {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      </aside>
    </>
  );
};

export default NotesColumn;
