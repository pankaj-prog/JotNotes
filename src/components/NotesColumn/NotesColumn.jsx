import React, { useState, useEffect } from "react";
import { IconButton, NoteListSection, Sidebar } from "components";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useAllNotes, useAuth } from "context";
import { useAxios } from "utils/useAxios";
import uuid from "draft-js/lib/uuid";

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
  filterState,
  filterDispatch,
}) => {
  const { setEncodedToken, encodedToken } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const { makeRequest: addNewNoteRequest, response: addNewNoteResponse } =
    useAxios();

  const { allNotesList, setAllNotesList } = useAllNotes();

  const logoutHandler = () => {
    localStorage.removeItem("encodedToken");
    setEncodedToken(null);
  };

  const createNoteHandler = () => {
    addNewNoteRequest({
      method: "post",
      url: "/api/notes",
      headers: { authorization: encodedToken },
      data: {
        note: {
          _id: uuid(),
          title: "",
          content: "",
          tags: [],
          color: "",
          priority: "medium",
          createdAt: Date.now(),
          editedAt: Date.now(),
        },
      },
    });
  };

  useEffect(() => {
    if (addNewNoteResponse) {
      setAllNotesList([...allNotesList, addNewNoteResponse.notes.at(-1)]);
      setSelectedNote(addNewNoteResponse.notes.at(-1));
    }
  }, [addNewNoteResponse]);

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
            <button className="btn text-btn" onClick={createNoteHandler}>
              <span className="text-lg">
                <AiOutlinePlus />
              </span>
              Create New Note
            </button>
          </section>
        )}

        {!(currentPageName == "allNotes") && notesList?.length == 0 && (
          <section className="empty-notes-container padding-default border-bottom">
            Your {pageTitle(currentPageName)} is currently empty.
          </section>
        )}

        <NoteListSection
          notesList={notesList}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          filterState={filterState}
          filterDispatch={filterDispatch}
        />

        <section className="user-wrapper padding-default">
          <h4>User's Name</h4>
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
