import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import { DuplicateKeyError } from "@/types/task.types";

export function handleSuccess<T>(
    data: T, message = "Success"
): NextResponse {

    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status: 200 }
    );
}

export function handleCreated<T>(
    data: T,
    message = "Resource created successfully"
): NextResponse {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status: 201 }
    );
}

export function handleApiError(error: unknown, message = "Internal server error") {
    if (error instanceof MongooseError.ValidationError) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation error",
                errors: error.errors,
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        {
            success: false,
            message,
        },
        { status: 500 }
    );
}

export function handleDuplicateKeyError(error: DuplicateKeyError): NextResponse | null {
    if (error?.code === 11000) {
        const duplicatedField = Object.keys(error.keyPattern || error.keyValue || {})[0] || "field";
        const value = error.keyValue?.[duplicatedField];

        return NextResponse.json(
            {
                success: false,
                message: `Duplicate entry: ${duplicatedField} '${value}' already exists.`,
                field: duplicatedField,
            },
            { status: 409 }
        );
    }
    return null;
}

export function handleDuplicateCheck(field: string, value: string): Response {
    return NextResponse.json(
        {
            success: false,
            message: `Duplicate ${field}: '${value}' already exists.`,
            field,
        },
        { status: 409 }
    );
}

export function handleUnauthorized(message = "Unauthorized") {
    return NextResponse.json({ success: false, message }, { status: 401 });
}

export function handleBadRequest(message = "Bad request") {
    return NextResponse.json({ success: false, message }, { status: 400 });
}

export function handleNotFound(message = "Not found") {
    return NextResponse.json({ success: false, message }, { status: 404 });
}
