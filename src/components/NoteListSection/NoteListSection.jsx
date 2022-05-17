import React, { useState } from "react";
import ReactQuill from "react-quill";
import { IconButton } from "components";
import { AiOutlineFilter } from "react-icons/ai";
import { RiSortDesc } from "react-icons/ri";
import "react-quill/dist/quill.bubble.css";
import { getFilteredList } from "utils/filters";
import { getTags } from "utils/getTags";

const priorities = ["High", "Medium", "Low"];

const NoteListSection = ({
  notesList,
  selectedNote,
  setSelectedNote,
  filterState,
  filterDispatch,
}) => {
  const filteredList = getFilteredList(notesList, filterState);

  const tags = getTags(notesList);

  return (
    <section className="note-list-section">
      {/* add options for sort and filter here */}
      <section className="filter-section border-bottom">
        <p>{filteredList.length} Notes</p>
        <div className="filter-options">
          <button
            className="btn clear-filter-btn"
            onClick={() => filterDispatch({ type: "CLEAR_FILTERS" })}
          >
            Clear Filters
          </button>
          <div className="dropdown-wrapper dropdown-wrapper-filter">
            <IconButton icon={<AiOutlineFilter />} />
            <div className="dropdown filter">
              <section>
                <span className="text-center">Filter by Priority</span>
                {priorities.map((priority) => {
                  return (
                    <button
                      className={`btn ${
                        filterState.priority == priority.toLowerCase()
                          ? "btn-selected"
                          : ""
                      }`}
                      onClick={() =>
                        filterDispatch({
                          type: "FILTER_BY_PRIORITY",
                          payload: priority.toLowerCase(),
                        })
                      }
                    >
                      {priority}
                    </button>
                  );
                })}
              </section>
              <section>
                <span className="text-center">Filter by Tags</span>
                {tags.map((tag) => {
                  return (
                    <button
                      className={`btn ${
                        filterState.tag == tag ? "btn-selected" : ""
                      }`}
                      onClick={() =>
                        filterDispatch({ type: "FILTER_BY_TAG", payload: tag })
                      }
                    >
                      {tag}
                    </button>
                  );
                })}
              </section>
            </div>
          </div>
          <div className="dropdown-wrapper dropdown-wrapper-sort">
            <IconButton icon={<RiSortDesc />} />
            <div className="dropdown sort">
              <span>Sort by date</span>
              <button
                className={`btn ${
                  filterState.sortByDate == "latest" ? "btn-selected" : ""
                }`}
                onClick={() =>
                  filterDispatch({ type: "SORT_BY_DATE", payload: "latest" })
                }
              >
                Latest
              </button>
              <button
                className={`btn ${
                  filterState.sortByDate == "oldest" ? "btn-selected" : ""
                }`}
                onClick={() =>
                  filterDispatch({ type: "SORT_BY_DATE", payload: "oldest" })
                }
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
      </section>
      <ul className="note-list ">
        {filteredList?.map((note) => {
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
