import { Schema, model } from "mongoose";


const Category = new Schema(
    {
        title: { type: String },
        notes: [{ type: Schema.Types.ObjectId, ref: "notes" }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
    },
    { timestamps: true }
);

const CategoryModel = model("Category", Category, "categories");

export default CategoryModel;
