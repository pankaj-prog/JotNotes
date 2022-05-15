import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { VscOpenPreview, VscColorMode } from "react-icons/vsc";
import { IoArchiveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "components";

const EditorColumn = ({ currentPageName, selectedNote }) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (selectedNote) {
      setValue(selectedNote.content);
      setTitle(selectedNote.title);
    }
  }, [selectedNote]);

  return !selectedNote ? (
    <main className="editor-column">
      <header className="editor-column-header border-bottom">
        <IconButton name="Focus" icon={<VscOpenPreview />} />
      </header>
    </main>
  ) : (
    <main className="editor-column">
      <header className="editor-column-header border-bottom">
        <IconButton name="Focus" icon={<VscOpenPreview />} />
        <section className="note-options">
          {currentPageName == "allNotes" && (
            <>
              <IconButton name="Color" icon={<VscColorMode />} />
              <IconButton name="Archive" icon={<IoArchiveOutline />} />
              <IconButton name="Trash" icon={<AiOutlineDelete />} />
            </>
          )}

          {currentPageName == "trash" && (
            <>
              <button className="btn text-btn">Restore Note</button>
              <button className="btn btn-alert">Delete Permanently</button>
            </>
          )}

          {currentPageName == "archive" && (
            <>
              <button className="btn text-btn">Move to trash</button>
              <button className="btn text-btn">Unarchive</button>
            </>
          )}
        </section>
      </header>
      <section className="note-title">
        <textarea
          readOnly={currentPageName == "trash" ? true : false}
          className="note-title-input text-lg padding-default"
          placeholder="Title..."
          rows="1"
          value={title}
          onChange={(e) => {
            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setTitle(e.target.value);
          }}
        />
      </section>
      <section className="editor-wrapper">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          readOnly={currentPageName == "trash" ? true : false}
          placeholder="Start jotting your notes..."
        />
      </section>
    </main>
  );
};

export default EditorColumn;
