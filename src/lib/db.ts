import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGO_URI = process.env.MONGO_URI!;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ DB connected successfully");
    } catch (error: unknown) {
        let errorMessage = "Database connection error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 }
        );
    }
};
