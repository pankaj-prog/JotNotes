import React, { useState } from "react";
import { IconButton, NoteListSection, Sidebar } from "components";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "context";

const pageTitle = (currentPageName) => {
  switch (currentPageName) {
    case "allNotes":
      return "All Notes";
    case "trash":
      return "Trash";
    case "archive":
      return "Archive";
  }
};

const NotesColumn = ({
  notesList,
  currentPageName,
  selectedNote,
  setSelectedNote,
}) => {
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
          <p className="fw-b notes-column-title ">
            {pageTitle(currentPageName)}
          </p>
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

        {!(currentPageName == "allNotes") && notesList.length == 0 && (
          <section className="empty-notes-container padding-default">
            Your {pageTitle(currentPageName)} is currently empty.
          </section>
        )}

        <NoteListSection
          notesList={notesList}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
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
