import { create } from "zustand";
import { ClientTask } from "@/types/task.types";

interface TaskStoreState {
    tasks: ClientTask[];
    loading: boolean;
    updatingTaskId: string | null;
    deletingTaskId: string | null;
    setTasks: (tasks: ClientTask[]) => void;
    toggleLoading: (value: boolean) => void;
    setUpdatingTaskId: (id: string | null) => void;
    setDeletingTaskId: (id: string | null) => void;
}

export const useTaskStore = create<TaskStoreState>((set) => ({
    tasks: [],
    loading: false,
    updatingTaskId: null,
    deletingTaskId: null,
    setTasks: (tasks) => set({ tasks }),
    toggleLoading: (value) => set({ loading: value }),
    setUpdatingTaskId: (id) => set({ updatingTaskId: id }),
    setDeletingTaskId: (id) => set({ deletingTaskId: id }),
}));
