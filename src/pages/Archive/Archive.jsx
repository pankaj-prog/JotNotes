import React, { useEffect } from "react";
import { NotesRoute } from "components";
import { useArchive, useAuth } from "context";
import { useAxios } from "utils/useAxios";

const Archive = () => {
  const { archiveNotesList, setArchiveNotesList } = useArchive();
  const { encodedToken } = useAuth();

  const {
    makeRequest: getArchiveNotesRequest,
    response: getArchiveNotesResponse,
  } = useAxios();

  useEffect(() => {
    getArchiveNotesRequest({
      method: "get",
      url: "/api/archives",
      headers: { authorization: encodedToken },
    });
  }, []);

  useEffect(() => {
    if (getArchiveNotesResponse) {
      setArchiveNotesList(getArchiveNotesResponse.archives);
    }
  }, [getArchiveNotesResponse]);

  return (
    <NotesRoute currentPageName={"archive"} notesList={archiveNotesList} />
  );
};

export default Archive;
