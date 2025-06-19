import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { authOptions } from "@/lib/auth-options";
import { handleApiError, handleBadRequest, handleNotFound, handleSuccess, handleUnauthorized } from "@/lib/error-handlers";

interface PatchTaskRequestBody {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    completed?: boolean;
    [key: string]: string | boolean | 'low' | 'medium' | 'high' | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: NextRequest, context: any) {
    try {

        const { id } = await (context as { params: { id: string } }).params;

        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return handleUnauthorized();
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleBadRequest("Invalid Task ID");
        }

        let data: PatchTaskRequestBody;
        try {
            data = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const allowedFields = ["title", "description", "priority", "completed"];
        const updateData: Partial<PatchTaskRequestBody> = {};

        for (const key of allowedFields) {
            if (data.hasOwnProperty(key)) {
                updateData[key] = data[key];
            }
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: session.user.id },
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedTask) {
            return handleNotFound("Task not found or unauthorized");
        }

        return handleSuccess({ message: "Task updated successfully", data: updatedTask, })

    } catch (err) {
        return handleApiError(err, "Failed to update task");
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any): Promise<NextResponse> {
    try {
        const { id } = await (context as { params: { id: string } }).params;

        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return handleUnauthorized();
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleBadRequest("Invalid Task ID");
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: session.user.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        ).lean();

        if (!task) {
            return handleNotFound("Task not found or already deleted");
        }

        return handleSuccess({ message: "Task deleted successfully" })
    } catch (err) {
        return handleApiError(err, "Failed to delete task");
    }
}