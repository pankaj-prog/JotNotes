import { EditorColumn, NotesColumn } from "components";
import React, { useState } from "react";

const NotesRoute = ({ currentPageName, notesList }) => {
  const [selectedNote, setSelectedNote] = useState();

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
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </div>
  );
};

export default NotesRoute;
