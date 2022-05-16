import React, { useEffect } from "react";

import { NotesRoute } from "components";
import { useAllNotes, useAuth } from "context";
import { useAxios } from "utils/useAxios";

const AllNotes = () => {
  const { allNotesList, setAllNotesList } = useAllNotes();
  const { encodedToken } = useAuth();
  const { makeRequest: getAllNotesRequest, response: getAllNotesResponse } =
    useAxios();

  useEffect(() => {
    getAllNotesRequest({
      method: "get",
      url: "/api/notes",
      headers: { authorization: encodedToken },
    });
  }, []);

  useEffect(() => {
    if (getAllNotesResponse) {
      setAllNotesList(getAllNotesResponse.notes);
    }
  }, [getAllNotesResponse]);

  return <NotesRoute currentPageName={"allNotes"} notesList={allNotesList} />;
};

export default AllNotes;
