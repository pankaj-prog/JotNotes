import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { VscOpenPreview, VscColorMode } from "react-icons/vsc";
import { IoArchiveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "components";
import { useAxios } from "utils/useAxios";
import { debounce } from "utils/debounce";
import { useAllNotes, useArchive, useAuth } from "context";

const EditorColumn = ({ currentPageName, selectedNote, notesList }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { setAllNotesList } = useAllNotes();
  const { addToArchive, unArchive, deleteFromArchive } = useArchive();
  const { encodedToken } = useAuth();

  const { makeRequest: updateNoteRequest, response: updateNoteResponse } =
    useAxios();

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content);
      setTitle(selectedNote.title);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote) {
      debounce(
        () =>
          updateNoteRequest({
            method: "post",
            url: `/api/notes/${selectedNote?._id}`,
            headers: { authorization: encodedToken },
            data: {
              note: {
                ...selectedNote,
                editedAt: Date.now(),
                title: title,
                content: content,
              },
            },
          }),
        300
      );
    }
  }, [content, title]);

  useEffect(() => {
    if (updateNoteResponse) {
      setAllNotesList(updateNoteResponse.notes);
    }
  }, [updateNoteResponse]);

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
              <IconButton
                name="Archive"
                icon={<IoArchiveOutline />}
                clickHandler={() => addToArchive(selectedNote)}
              />
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
              <button
                className="btn text-btn"
                onClick={() => deleteFromArchive(selectedNote)}
              >
                Delete Note
              </button>
              <button
                className="btn text-btn"
                onClick={() => unArchive(selectedNote)}
              >
                Unarchive
              </button>
            </>
          )}
        </section>
      </header>
      <section className="note-title">
        <textarea
          readOnly={currentPageName == "allNotes" ? false : true}
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
          theme={currentPageName == "allNotes" ? "snow" : "bubble"}
          value={content}
          onChange={(e) => {
            console.log("on change working");
            setContent(e);
          }}
          readOnly={currentPageName == "allNotes" ? false : true}
          placeholder="Start jotting your notes..."
        />
      </section>
    </main>
  );
};

export default EditorColumn;
