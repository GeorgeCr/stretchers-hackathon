import { Schema, model } from "mongoose";


const Note = new Schema(
    {
        title: { type: String },
        content: { type: String },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
);

const NotesModel = model("Note", Note, "PHARMACIST_NOTES");

export default NotesModel;