import { useContext, createContext, useState, useEffect } from "react";
import { useAxios } from "utils/useAxios";
import { useAuth } from "context";

const AllNotesContext = createContext(null);

const useAllNotes = () => useContext(AllNotesContext);

const AllNotesProvider = ({ children }) => {
  const [allNotesList, setAllNotesList] = useState([]);
  const { makeRequest: updateColorRequest, response: updateColorResponse } =
    useAxios();
  const { makeRequest: updateTagsRequest } = useAxios();
  const { makeRequest: updateNotePriortiyRequest } = useAxios();

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

  const updateNoteTags = async (note, tags) => {
    try {
      const res = await updateTagsRequest({
        method: "post",
        url: `/api/notes/${note?._id}`,
        headers: { authorization: encodedToken },
        data: {
          note: {
            ...note,
            tags,
          },
        },
      });

      if (res) {
        setAllNotesList(res.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateNotePriority = async (note, priority) => {
    console.log("priority", note);
    try {
      const res = await updateNotePriortiyRequest({
        method: "post",
        url: `/api/notes/${note?._id}`,
        headers: { authorization: encodedToken },
        data: {
          note: {
            ...note,
            priority,
          },
        },
      });

      if (res) {
        setAllNotesList(res.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AllNotesContext.Provider
      value={{
        allNotesList,
        setAllNotesList,
        updateNoteColor,
        updateNoteTags,
        updateNotePriority,
      }}
    >
      {children}
    </AllNotesContext.Provider>
  );
};

export { useAllNotes, AllNotesProvider };
