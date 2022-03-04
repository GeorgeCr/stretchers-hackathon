import { ObjectId } from "mongodb"
import logger from "../utils/logger"
import CategoryModel from "../models/CategoryModel";


export const createCategory = async (req, res, next) => {
    const { userId, title } = req.body;
    const Category = new CategoryModel({ title, userId });
    const result = Category.save((err) => {
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

export const getCategory = async (req, res, next) => {
    const { id } = req.body;
    const result = CategoryModel.findById(id, (err) => {
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

export const getCategories = async (req, res, next) => {
    const { userId } = req.body;
    const result = CategoryModel.find({ userId: ObjectId(userId) }, (err) => {
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

export const deleteCategory = async (req, res, next) => {
    const { id } = req.body;
    const result = CategoryModel.findById(id, (err) => {
        if (err) {
            logger.log({
                level: "error",
                message: `Failed to save in collection. - ${err}`,
                stack: err.stack,
            });
            res.status(500).send(err);
        }
    });
    //search for notes in this category to delete them also

};
