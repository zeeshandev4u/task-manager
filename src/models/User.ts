import { Schema, model, models, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

export type IUser = InferSchemaType<typeof UserSchema>;

export const UserModel = models.User || model("User", UserSchema);