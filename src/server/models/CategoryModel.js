import { Schema, model } from "mongoose";


const Category = new Schema(
    {
        title: { type: String },
        notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
);

const CategoryModel = model("Category", Category, "PHARMACIST_NOTES");

export default CategoryModel;
