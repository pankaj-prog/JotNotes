import React, { useEffect } from "react";
import { NotesRoute } from "components";
import { useAuth, useTrash } from "context";
import { useAxios } from "utils/useAxios";

const Trash = () => {
  const { trashNotesList, setTrashNotesList } = useTrash();
  const { encodedToken } = useAuth();

  const { makeRequest: getTrashNotesRequest, response: getTrashNotesResponse } =
    useAxios();

  useEffect(() => {
    getTrashNotesRequest({
      method: "get",
      url: "/api/trash",
      headers: { authorization: encodedToken },
    });
  }, []);

  useEffect(() => {
    if (getTrashNotesResponse) {
      setTrashNotesList(getTrashNotesResponse.trash);
    }
  }, [getTrashNotesResponse]);

  return <NotesRoute currentPageName={"trash"} notesList={trashNotesList} />;
};

export default Trash;
