import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { VscOpenPreview, VscColorMode } from "react-icons/vsc";
import { IoArchiveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "components";
import { useAxios } from "utils/useAxios";
import { debounce } from "utils/debounce";
import { useAllNotes, useArchive, useAuth, useTrash } from "context";

const colors = ["#f0f8ff", "#f9e5e5", "#d7f5c2"];

const EditorColumn = ({ currentPageName, selectedNote, setSelectedNote }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const tagRef = useRef();
  const [showColors, setShowColors] = useState(false);

  const {
    setAllNotesList,
    updateNoteColor,
    updateNoteTags,
    updateNotePriority,
  } = useAllNotes();

  const { addToArchive, unArchive, deleteFromArchive } = useArchive();
  const { moveToTrash, restoreNote, deleteFromTrash } = useTrash();
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
    <main
      className="editor-column"
      style={{ backgroundColor: selectedNote.color }}
    >
      <header className="editor-column-header border-bottom">
        <div className="priority">
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            id="priority"
            value={selectedNote.priority}
            onChange={(e) => {
              setSelectedNote({ ...selectedNote, priority: e.target.value });
              updateNotePriority(selectedNote, e.target.value);
            }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
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
                            setSelectedNote({
                              ...selectedNote,
                              color: colorCode,
                            });
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
      <section className="note-title border-bottom">
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
            setSelectedNote({ ...selectedNote, title: e.target.value });
          }}
        />
      </section>
      <section className="tags-section">
        <div className="tags-wrapper">
          {selectedNote.tags.map((tag) => {
            return (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            );
          })}
        </div>
        <input type="text" ref={tagRef} placeholder="add tag..." />
        <IconButton
          icon={<AiOutlinePlusCircle />}
          clickHandler={() => {
            if (tagRef.current.value.trim()) {
              updateNoteTags(selectedNote, [
                ...selectedNote.tags,
                tagRef.current.value.trim(),
              ]);
              setSelectedNote({
                ...selectedNote,
                tags: [...selectedNote.tags, tagRef.current.value],
              });
            }
            tagRef.current.value = "";
          }}
        ></IconButton>
      </section>
      <section className="editor-wrapper">
        <ReactQuill
          theme={currentPageName == "allNotes" ? "snow" : "bubble"}
          value={content}
          onChange={(e) => {
            setContent(e);
            setSelectedNote({ ...selectedNote, content: e });
          }}
          readOnly={currentPageName == "allNotes" ? false : true}
          placeholder="Start jotting your notes..."
        />
      </section>
    </main>
  );
};

export default EditorColumn;
