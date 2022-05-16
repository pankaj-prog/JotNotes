import { EditorColumn, NotesColumn } from "components";
import React, { useState, useEffect } from "react";

const NotesRoute = ({ currentPageName, notesList }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    if (!notesList?.some((note) => note._id == selectedNote?._id)) {
      setSelectedNote(null);
    }
  }, [notesList]);

  return (
    <div className="app">
      <NotesColumn
        currentPageName={currentPageName}
        notesList={notesList}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <EditorColumn
        currentPageName={currentPageName}
        notesList={notesList}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </div>
  );
};

export default NotesRoute;
