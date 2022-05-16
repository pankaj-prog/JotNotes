import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { VscOpenPreview, VscColorMode } from "react-icons/vsc";
import { IoArchiveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "components";
import { useAxios } from "utils/useAxios";
import { debounce } from "utils/debounce";
import { useAllNotes, useArchive, useAuth, useTrash } from "context";

const colors = ["#f0f8ff", "#f9e5e5", "#d7f5c2"];

const EditorColumn = ({ currentPageName, selectedNote, notesList }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [showColors, setShowColors] = useState(false);

  const { setAllNotesList, updateNoteColor } = useAllNotes();
  const { addToArchive, unArchive, deleteFromArchive } = useArchive();
  const { moveToTrash, restoreNote, deleteFromTrash } = useTrash();
  const { encodedToken } = useAuth();

  const { makeRequest: updateNoteRequest, response: updateNoteResponse } =
    useAxios();

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content);
      setTitle(selectedNote.title);
      setColor(selectedNote.color);
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
    <main className="editor-column" style={{ backgroundColor: color }}>
      <header className="editor-column-header border-bottom">
        <IconButton name="Focus" icon={<VscOpenPreview />} />
        <section className="note-options">
          {currentPageName == "allNotes" && (
            <>
              <button
                className="color-wrapper btn text-lg"
                onClick={() => {
                  setShowColors(true);
                }}
                onBlur={() => setShowColors(false)}
              >
                <VscColorMode />
                {showColors && (
                  <span className="colors">
                    {colors.map((colorCode) => {
                      return (
                        <span
                          className="color"
                          onClick={() => {
                            console.log("clicked color", colorCode);
                            setColor(colorCode);
                            updateNoteColor(selectedNote, colorCode);
                          }}
                          style={{ backgroundColor: colorCode }}
                        ></span>
                      );
                    })}
                  </span>
                )}
              </button>
              <IconButton
                name="Archive"
                icon={<IoArchiveOutline />}
                clickHandler={() => addToArchive(selectedNote)}
              />
              <IconButton
                name="Trash"
                icon={<AiOutlineDelete />}
                clickHandler={() => moveToTrash(selectedNote)}
              />
            </>
          )}

          {currentPageName == "trash" && (
            <>
              <button
                className="btn text-btn"
                onClick={() => restoreNote(selectedNote)}
              >
                Restore Note
              </button>
              <button
                className="btn btn-alert"
                onClick={() => deleteFromTrash(selectedNote)}
              >
                Delete Permanently
              </button>
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
