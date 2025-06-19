import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Task } from "@/models/Task";
import { authOptions } from "@/lib/auth-options";
import {
    handleApiError, handleCreated, handleDuplicateKeyError,
    handleSuccess, handleUnauthorized
} from "@/lib/error-handlers";
import { DuplicateKeyError } from "@/types/task.types";

const TaskZodSchema = z.object({
    title: z.string().min(3, "Title is required").max(30, "Title cannot exceed 30 characters"),
    description: z.string().min(3, "Description is required").max(100, "Title cannot exceed 100 characters"),
    priority: z.enum(["low", "medium", "high"]),
});

export async function GET(): Promise<NextResponse> {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return handleUnauthorized();
    }

    try {
        const tasks = await Task.find({
            userId: session.user.id,
            isDeleted: false,
        })
            .sort({ createdAt: -1 })
            .lean();

        return handleSuccess({ message: "Tasks fetched successfully", data: tasks, })
    } catch (err) {
        return handleApiError(err, "Failed to fetch tasks");
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return handleUnauthorized();
    }

    let json;
    try {
        json = await req.json();
    } catch {
        return NextResponse.json({
            success: false,
            message: "Invalid JSON body",
        }, { status: 400 });
    }

    const parsed = TaskZodSchema.safeParse(json);
    if (!parsed.success) {
        const errors = parsed.error.format();
        return NextResponse.json({
            success: false,
            message: "Validation failed",
            errors,
        }, { status: 422 });
    }

    try {
        const task = await Task.create({
            ...parsed.data,
            userId: session.user.id,
        });

        return handleCreated({ data: task, message: "Task created successfully", });

    } catch (err) {
        const duplicate = handleDuplicateKeyError(err as DuplicateKeyError);
        if (duplicate) return duplicate;

        return handleApiError(err, "Failed to create task");
    }
}
