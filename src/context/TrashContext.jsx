import { useContext, createContext, useState, useEffect } from "react";
import { useAxios } from "utils/useAxios";
import { useAllNotes } from "./AllNotesContext";
import { useAuth } from "./AuthContext";

const TrashContext = createContext(null);

const useTrash = () => useContext(TrashContext);

const TrashProvider = ({ children }) => {
  const [trashNotesList, setTrashNotesList] = useState([]);
  const { encodedToken } = useAuth();
  const { makeRequest: moveToTrashRequest, response: moveToTrashResponse } =
    useAxios();
  const { makeRequest: restoreRequest, response: restoreResponse } = useAxios();
  const {
    makeRequest: deleteFromTrashRequest,
    response: deleteFromTrashResponse,
  } = useAxios();

  const { setAllNotesList } = useAllNotes();

  const moveToTrash = (note) => {
    moveToTrashRequest({
      method: "post",
      url: `/api/notes/trash/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: { note },
    });
  };

  useEffect(() => {
    if (moveToTrashResponse) {
      setAllNotesList(moveToTrashResponse.notes);
      setTrashNotesList(moveToTrashResponse.trash);
    }
  }, [moveToTrashResponse]);

  const restoreNote = (note) => {
    restoreRequest({
      method: "post",
      url: `/api/trash/restore/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: {},
    });
  };

  useEffect(() => {
    if (restoreResponse) {
      setAllNotesList(restoreResponse.notes);
      setTrashNotesList(restoreResponse.trash);
    }
  }, [restoreResponse]);

  const deleteFromTrash = (note) => {
    deleteFromTrashRequest({
      method: "delete",
      url: `/api/trash/delete/${note._id}`,
      headers: {
        authorization: encodedToken,
      },
      data: {},
    });
  };

  useEffect(() => {
    if (deleteFromTrashResponse) {
      setTrashNotesList(deleteFromTrashResponse.trash);
    }
  }, [deleteFromTrashResponse]);

  return (
    <TrashContext.Provider
      value={{
        trashNotesList,
        setTrashNotesList,
        moveToTrash,
        restoreNote,
        deleteFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

export { useTrash, TrashProvider };
