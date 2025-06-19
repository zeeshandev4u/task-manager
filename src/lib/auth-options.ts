import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectDB } from "./db";
import { UserModel } from "@/models/User";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectDB();

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing email or password.");
                    }

                    const user = await UserModel.findOne({ email: credentials.email }).select("+password");

                    if (!user) {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        throw new Error("Invalid email or password.");
                    }

                    const isValid = await compare(credentials.password, user.password);
                    if (!isValid) {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        throw new Error("Invalid email or password.");
                    }

                    return { id: user._id.toString(), email: user.email, name: user?.name };
                } catch (err) {
                    console.error("Auth error:", err);
                    throw new Error("Invalid email or password.");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 12,
    },
    jwt: {
        maxAge: 60 * 60 * 12,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};
