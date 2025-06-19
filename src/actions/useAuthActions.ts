"use client";

import { signIn, signOut, getSession } from "next-auth/react";
import { useUserStore } from "@/stores/userStore";

export const useAuthActions = () => {
    const { setUser, clearUser, setLoading } = useUserStore();

    const loginUser = async (email: string, password: string) => {
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setLoading(false);
                return { success: false, message: res.error };
            }

            await fetchUser();
            setLoading(false);
            return { success: true };
        } catch (err) {
            console.error("Login error:", err);
            return { success: false, message: "Something went wrong. Please try again." };
        }
    };

    const logoutUser = async () => {
        await signOut({ callbackUrl: '/login' });
        clearUser();
    };

    const fetchUser = async () => {
        const session = await getSession();
        if (session?.user) {
            setUser({ id: session.user.id, email: session.user.email, name: session.user.name || '' });
        }
    };

    return {
        loginUser,
        logoutUser,
        fetchUser,
    };
};
