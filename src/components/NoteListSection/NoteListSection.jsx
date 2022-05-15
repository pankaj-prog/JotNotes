import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const NoteListSection = ({ notesList, selectedNote, setSelectedNote }) => {
  return (
    <section className="note-list-section">
      {/* add options for sort and filter here */}
      <ul className="note-list ">
        {notesList.map((note) => {
          return (
            <li
              key={note._id}
              className={`note-list-item border-bottom padding-default ${
                selectedNote?._id == note._id && "selected-note"
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <h5 className="text-ellipsis">
                {note.title ? note.title : "New Note"}
              </h5>
              <ReactQuill
                value={note.content ? note.content : "..."}
                readOnly={true}
                theme="bubble"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NoteListSection;
