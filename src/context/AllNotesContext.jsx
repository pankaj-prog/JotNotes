import { useContext, createContext, useState, useEffect } from "react";
import { useAxios } from "utils/useAxios";
import { useAuth } from "context";

const AllNotesContext = createContext(null);

const useAllNotes = () => useContext(AllNotesContext);

const AllNotesProvider = ({ children }) => {
  const [allNotesList, setAllNotesList] = useState([]);
  const { makeRequest: updateColorRequest, response: updateColorResponse } =
    useAxios();

  const { encodedToken } = useAuth();

  const updateNoteColor = (note, color) => {
    updateColorRequest({
      method: "post",
      url: `/api/notes/${note?._id}`,
      headers: { authorization: encodedToken },
      data: {
        note: {
          ...note,
          color,
        },
      },
    });
  };

  useEffect(() => {
    if (updateColorResponse) {
      setAllNotesList(updateColorResponse.notes);
    }
  }, [updateColorResponse]);

  return (
    <AllNotesContext.Provider
      value={{ allNotesList, setAllNotesList, updateNoteColor }}
    >
      {children}
    </AllNotesContext.Provider>
  );
};

export { useAllNotes, AllNotesProvider };
