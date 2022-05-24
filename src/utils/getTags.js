export const getTags = (notesList) => {
  return [...new Set(notesList.map((note) => note.tags).flat())];
};
