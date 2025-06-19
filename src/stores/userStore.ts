import { create } from "zustand";

interface UserStoreState {
    user: { id: string; email: string, name: string } | null;
    loading: boolean;
    setUser: (user: UserStoreState["user"]) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    user: null,
    loading: false,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setLoading: (loading) => set({ loading }),
}));
