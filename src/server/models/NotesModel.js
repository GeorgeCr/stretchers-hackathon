import { Schema, model } from "mongoose";

const NotesSchema = new Schema(
    {
        title: {type: String},
        content: {type: String},
        categoryId: {type: Schema.Types.ObjectId, ref: 'categories'},
        userId: {type: Schema.Types.ObjectId, ref: 'users'},

    },
    { timestamps: true}
);

const NotesModel = model("notes", NotesSchema);

export default NotesModel;