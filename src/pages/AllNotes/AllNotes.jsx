import React, { useState } from "react";

import { NotesRoute } from "components";

const notesList = [
  {
    _id: 123,
    title: "Handling react state",
    content:
      "first note dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
  {
    _id: 124,
    title: "side effects in react",
    content:
      "second note, dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
  {
    _id: 125,
    title: "controlled and uncontrolled components",
    content:
      "third note, dolor sit amet consectetur adipisicing elit. Velit sint nesciunt corrupti possimus iste earum tenetur commodi expedita ex omnis.",
    tags: ["first note"],
  },
];

const AllNotes = () => {
  return <NotesRoute currentPageName={"allNotes"} notesList={notesList} />;
};

export default AllNotes;
