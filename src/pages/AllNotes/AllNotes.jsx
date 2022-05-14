import React from "react";

import { EditorColumn, NotesColumn } from "components";

const notesList = [
  {
    _id: 123,
    title: "Handling react state",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
  {
    _id: 124,
    title: "side effects in react",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
  {
    _id: 125,
    title: "controlled and uncontrolled components",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
];

const AllNotes = () => {
  return (
    <div className="app">
      <NotesColumn currentPageName="allNotes" notesList={notesList} />
      <EditorColumn currentPageName="allNotes" />
    </div>
  );
};

export default AllNotes;
