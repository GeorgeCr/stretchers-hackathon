import { Schema, model } from "mongoose";

const UsersSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],

    },
    { timestamps: true }
);

const UsersModel = model("User", UsersSchema, "users");

export default UsersModel;