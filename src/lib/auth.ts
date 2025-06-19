import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export async function auth() {
    return await getServerSession(authOptions);
}