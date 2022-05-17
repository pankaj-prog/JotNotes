import { EditorColumn, NotesColumn } from "components";
import React, { useState, useEffect, useReducer } from "react";
import { filterReducer } from "utils/filterReducer";

export const initialFilterState = {
  tag: "all",
  priority: "all",
  sortByDate: "latest",
};

const NotesRoute = ({ currentPageName, notesList }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  useEffect(() => {
    if (!notesList?.some((note) => note._id == selectedNote?._id)) {
      setSelectedNote(null);
    }
  }, [notesList]);

  useEffect(() => {
    setSelectedNote(null);
  }, [filterState]);

  return (
    <div className="app">
      <NotesColumn
        currentPageName={currentPageName}
        notesList={notesList}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        filterState={filterState}
        filterDispatch={filterDispatch}
      />
      <EditorColumn
        currentPageName={currentPageName}
        notesList={notesList}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        filterDispatch={filterDispatch}
      />
    </div>
  );
};

export default NotesRoute;
