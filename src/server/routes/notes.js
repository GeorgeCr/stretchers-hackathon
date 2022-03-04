import { Router } from "express";
import { createNote, getNote, getNotes, updateNote, deleteNote } from "../controllers/NotesController";

const notesRouter = new Router();

notesRouter.post("/note", createNote);
notesRouter.get("/note", getNote);
notesRouter.get("/notes", getNotes);
notesRouter.patch("/note", updateNote);
notesRouter.delete("/note", deleteNote);

export default notesRouter;
