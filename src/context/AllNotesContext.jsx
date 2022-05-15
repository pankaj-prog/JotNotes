import { useContext, createContext, useState } from "react";

const AllNotesContext = createContext(null);

const useAllNotes = () => useContext(AllNotesContext);

const AllNotesProvider = ({ children }) => {
  const [allNotesList, setAllNotesList] = useState([]);

  return (
    <AllNotesContext.Provider value={{ allNotesList, setAllNotesList }}>
      {children}
    </AllNotesContext.Provider>
  );
};

export { useAllNotes, AllNotesProvider };
