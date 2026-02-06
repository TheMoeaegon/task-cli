import type { Note } from "./types.js";

export const listNotes = (notes: Note[]) => {
    notes.forEach(({ id, content, tags }) => {
        console.log(`tags: [${tags}]`);
        console.log(`id: ${id}`);
        console.log(`content: ${content}`);
        console.log("\n");
    });
};
