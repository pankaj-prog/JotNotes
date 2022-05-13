import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { VscOpenPreview, VscColorMode } from "react-icons/vsc";
import { IoArchiveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "components";

const EditorColumn = () => {
  const [value, setValue] = useState("");

  return (
    <main className="editor-column">
      <header className="editor-column-header border-bottom">
        <IconButton name="Focus" icon={<VscOpenPreview />} />
        <section className="note-options">
          <IconButton name="Color" icon={<VscColorMode />} />
          <IconButton name="Archive" icon={<IoArchiveOutline />} />
          <IconButton name="Trash" icon={<AiOutlineDelete />} />
        </section>
      </header>
      <section className="note-title">
        <input
          type="text"
          className="note-title-input text-xxl padding-default"
          placeholder="Title..."
        />
      </section>
      <section className="editor-wrapper">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Start jotting your notes..."
        />
      </section>
    </main>
  );
};

export default EditorColumn;
