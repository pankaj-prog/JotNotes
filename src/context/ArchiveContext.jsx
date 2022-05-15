import { useContext, createContext, useState, useEffect } from "react";
import { useAxios } from "utils/useAxios";
import { useAllNotes } from "./AllNotesContext";
import { useAuth } from "./AuthContext";

const ArchiveContext = createContext(null);

const useArchive = () => useContext(ArchiveContext);

const ArchiveProvider = ({ children }) => {
  const [archiveNotesList, setArchiveNotesList] = useState([]);
  const { encodedToken } = useAuth();
  const { makeRequest: addToArchiveRequest, response: addToArchiveResponse } =
    useAxios();
  const { makeRequest: unArchiveRequest, response: unArchiveResponse } =
    useAxios();
  const {
    makeRequest: deleteFromArchiveRequest,
    response: deleteFromArchiveResponse,
  } = useAxios();

  const { setAllNotesList } = useAllNotes();

  const addToArchive = (note) => {
    addToArchiveRequest({
      method: "post",
      url: `/api/notes/archives/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: { note },
    });
  };

  useEffect(() => {
    if (addToArchiveResponse) {
      setAllNotesList(addToArchiveResponse.notes);
      setArchiveNotesList(addToArchiveResponse.archives);
    }
  }, [addToArchiveResponse]);

  const unArchive = (note) => {
    unArchiveRequest({
      method: "post",
      url: `/api/archives/restore/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: {},
    });
  };

  useEffect(() => {
    if (unArchiveResponse) {
      setAllNotesList(unArchiveResponse.notes);
      setArchiveNotesList(unArchiveResponse.archives);
    }
  }, [unArchiveResponse]);

  const deleteFromArchive = (note) => {
    deleteFromArchiveRequest({
      method: "delete",
      url: `/api/archives/delete/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: {},
    });
  };

  useEffect(() => {
    if (deleteFromArchiveResponse) {
      setArchiveNotesList(deleteFromArchiveResponse.archives);
    }
  }, [deleteFromArchiveResponse]);

  return (
    <ArchiveContext.Provider
      value={{
        archiveNotesList,
        setArchiveNotesList,
        addToArchive,
        unArchive,
        deleteFromArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export { useArchive, ArchiveProvider };
