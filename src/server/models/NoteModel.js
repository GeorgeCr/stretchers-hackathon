import { Schema, model } from "mongoose";


const Note = new Schema(
    {
        title: { type: String },
        content: { type: String },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "categories"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
    },
    { timestamps: true }
);

const NotesModel = model("Note", Note, "notes");

export default NotesModel;