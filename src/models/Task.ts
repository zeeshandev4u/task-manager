import { Schema, model, models, InferSchemaType } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 30 },
    description: { type: String, required: true, minlength: 3, maxlength: 100 },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

TaskSchema.index({ userId: 1 });

export type ITask = InferSchemaType<typeof TaskSchema>;

export const Task = models.Task || model("Task", TaskSchema);