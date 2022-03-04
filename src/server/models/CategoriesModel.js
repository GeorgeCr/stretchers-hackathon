import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
    {
        title: {type: String},
        notes: [{type: Schema.Types.ObjectId, ref: 'categories'}],
        userId: {type: Schema.Types.ObjectId, ref: 'users'},

    },
    { timestamps: true}
);

const CategoryModel = model("categories", CategorySchema);

export default CategoryModel;