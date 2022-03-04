import { Router } from "express";
import { createCategory, getCategory, getCategories, deleteCategory } from "../controllers/CategoryController";

const categoryRouter = new Router();

categoryRouter.post("/category", createCategory);
categoryRouter.get("/category", getCategory);
categoryRouter.get("/categories", getCategories);
categoryRouter.delete("/category", deleteCategory);

export default categoryRouter;
