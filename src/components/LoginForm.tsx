"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validation";
import { LucideMail, LucideLock, Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useAuthActions } from "@/actions/useAuthActions";

export default function LoginForm() {
    const { loading } = useUserStore();
    const { loginUser } = useAuthActions();

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            return;
        }
        setError(null);
        const result = await loginUser(email, password);
        if (!result.success) {
            setError(result.message || "Login failed.");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-3xl font-bold text-center">Schedule Tasks</h2>
            <p className="text-sm text-center text-gray-500">Login to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <div className="relative mt-1">
                        <LucideMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <div className="relative mt-1">
                        <LucideLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <p className="text-sm text-red-500 min-h-[20px]">
                    {error || '\u00A0'}
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 font-semibold cursor-pointer text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin" size={18} />}
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="text-sm text-center text-gray-500">
                Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
        </div>
    );
}