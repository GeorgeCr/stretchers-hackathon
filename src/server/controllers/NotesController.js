import { ObjectId } from "mongodb"
import NotesModel from "../models/NoteModel"
import CategoryModel from "../models/CategoryModel";
import { use } from "express/lib/application";



export const createNote = async (req, res, next) => {
    const { title, content, categoryId, userId } = req.body;
    const Note = new NotesModel({ title, content, categoryId: ObjectId(categoryId), userId: ObjectId(userId) });
    const noteResult = await Note.save((err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to save in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    });
    //how do you append here noteId to notes
    const categoryResult = CategoryModel.updateOne({ _id: ObjectId(categoryId) }, { $push: { notes: noteResult._id } },
        (err) => {
            if (err) {
                logger.log({
                    level: "error",
                    message: `Failed to save in collection. - ${err}`,
                    stack: err.stack,
                });
                res.status(500).send(err);
            }
        });
    res.send({ noteResult, categoryResult });
};

export const getNote = async (req, res, next) => {
    const { id } = req.body;
    const result = await new NotesModel().findById(id, (err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to save in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    });
    res.send(result);
};

export const getNotes = async (req, res, next) => {
    const { userId } = req.body;
    const result = await new NotesModel().find({ userId: ObjectId(userId) }, (err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to save in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    });
    res.send(result);
};

export const updateNote = async (req, res, next) => {
    const { id, title, content } = req.body;
    const result = NotesModel.updateOne({ _id: ObjectId(id) }, { title, content },
        (err) => {
            if (err) {
                logger.log({
                    level: "error",
                    message: `Failed to save in collection. - ${err}`,
                    stack: err.stack,
                });
                res.status(500).send(err);
            }
        });
    res.send(result);
};

export const deleteNote = async (req, res, next) => {

};