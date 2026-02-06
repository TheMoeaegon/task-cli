import { insertDb, getDb, saveDb } from "./db.js";
import type { Note } from "./types.js";

export const createNewNote = async (note: string, tags: string[]) => {
    const newNote: Note = {
        content: note,
        id: Date.now().toString(),
        tags,
    };
    await insertDb(newNote);
    return newNote;
};

export const getAllNotes = async () => {
    const { notes } = await getDb();
    return notes;
};

export const findNotes = async (filter: string) => {
    const { notes: allNotes } = await getDb();
    return allNotes.filter((note) =>
        note.content.toLowerCase().includes(filter.toLocaleLowerCase()),
    );
};

export const removeNotes = async (id: string) => {
    const { notes } = await getDb();
    const match = notes.find((note) => note.id === id);
    if (!match) {
        return;
    }
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDb({ notes: newNotes });
    return id;
};

export const removeAllNotes = () => saveDb({ notes: [] });
