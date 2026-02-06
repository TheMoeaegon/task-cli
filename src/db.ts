import fs from "node:fs/promises";
import { Note } from "./types";

const DB_URL = new URL("../db.json", import.meta.url).pathname;

export const getDb = async (): Promise<{ notes: Note[] }> => {
  const db = await fs.readFile(DB_URL, "utf-8");
  return JSON.parse(db);
};

export const saveDb = async (db: { notes: Note[] }) => {
  return await fs.writeFile(DB_URL, JSON.stringify(db, null, 2));
};

export const insertDb = async (data: Note) => {
  const db = await getDb();
  db.notes.push(data);
  await saveDb(db);
};
