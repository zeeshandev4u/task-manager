import { connectDB } from "@/lib/db";
import { handleCreated, handleDuplicateCheck } from "@/lib/error-handlers";
import { UserModel } from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    await connectDB();
    const { email, password, name } = await req.json();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return handleDuplicateCheck("email", email);
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        name,
    });

    return handleCreated(
        { id: newUser._id, email: newUser.email },
        "User created successfully"
    );
}
