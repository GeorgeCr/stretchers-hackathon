import { ObjectId } from "mongodb"
import NotesModel from "../models/NoteModel"
import CategoryModel from "../models/CategoryModel";
import logger from "../utils/logger"



export const createNote = async (req, res, next) => {
    const { title, content, categoryId, userId } = req.body;
    const Note = NotesModel({ title, content, categoryId: ObjectId(categoryId), userId: ObjectId(userId) });
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
    const categoryResult = CategoryModel.updateOne({ _id: ObjectId(categoryId) }, { $push: { notes: noteResult._id } },
        (err) => {
            if (err) {
                logger.log({
                    level: "error",
                    message: `Failed to update in collection. - ${err}`,
                    stack: err.stack,
                });
                res.status(500).send(err);
            }
        });
    res.send({ noteResult, categoryResult });
};

export const getNote = async (req, res, next) => {
    const { id } = req.body;
    const result = NotesModel.findById(id, (err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to find in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    });
    res.send(result);
};

export const getNotes = async (req, res, next) => {
    console.log('req', req.body);
    const { userId } = req.body;
    try {
        const result = await NotesModel.find({ userId: ObjectId(userId) });
        res.send(result);
    } catch (err) {
        logger.log({
            level: "error",
            message: `Failed to find in collection. - ${err}`,
            stack: err.stack,
        });
        res.status(500).send(err);
    }
    // const result = new NotesModel().find({ userId: ObjectId(userId) }, (err) => {
    //     if (err) {
    //         logger.log({
    //             level: "error",
    //             message: `Failed to find in collection. - ${err}`,
    //             stack: err.stack,
    //         });
    //         res.status(500).send(err);
    //     }
    // });
    // res.send(result);
};

export const updateNote = async (req, res, next) => {
    const { id, title, content } = req.body;
    const result = NotesModel.updateOne({ _id: ObjectId(id) }, { title, content },
        (err) => {
            if (err) {
                logger.log({
                    level: "error",
                    message: `Failed to update in collection. - ${err}`,
                    stack: err.stack,
                });
                res.status(500).send(err);
            }
        });
    res.send(result);
};

export const deleteNote = async (req, res, next) => {
    const { id } = req.body;
    const notesResult = NotesModel.deleteOne({ _id: ObjectId(id) },
        (err) => {
            if (err) {
                logger.log({
                    level: "error",
                    message: `Failed to delete in collection. - ${err}`,
                    stack: err.stack,
                });
                res.status(500).send(err);
            }
        });
    const categoryResult = CategoryModel.updateOne({ notes: ObjectId(id) }, { $pull: { notes: ObjectId(id) } }, (err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to delete in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    })
    res.send({ notesResult, categoryResult });
};