"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import TaskInput from "./TaskInput";
import TaskSearchSort from "./TaskSearchSort";
import TaskList from "./TaskList";
import { sortTasks } from "@/utils/task.utils";
import { useAuthActions } from "@/actions/useAuthActions";
import { useTaskActions } from "@/actions/useTaskActions";
import { useTaskStore } from "@/stores/taskStore";
import TasksNotFound from "./TasksNotFound";
import TasksLoading from "./TasksLoading";

const TaskPage = () => {
    const { logoutUser } = useAuthActions()
    const { fetchTasks } = useTaskActions()

    const { tasks, loading } = useTaskStore()

    const [editIndex, setEditIndex] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState<"date" | "priority" | "alphabetical" | "completion">("date");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredAndSortedTasks = sortTasks(tasks, searchQuery, sortCriteria, sortDirection);

    return (
        <div className="min-h-screen bg-transparent text-white max-w-7xl mx-auto p-6 space-y-6">

            <div className="flex justify-end">
                <button onClick={logoutUser} className="flex items-center space-x-2 px-3 py-2 rounded-md border bg-[#373d47] border-gray-300 text-[#CCCCCC] transition-all duration-200 mt-4 hover:scale-102 hover:ring-2 hover:ring-[#adadad] cursor-pointer">
                    <LogOut size={20} className="text-[#CCCCCC]" />
                    <span>Logout</span>
                </button>
            </div>

            <TaskInput />

            <div className="backdrop-blur-xl bg-gray-600 rounded-xl border border-white /20 p-6">
                <TaskSearchSort
                    sortCriteria={sortCriteria}
                    setSortCriteria={setSortCriteria}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {loading ? (
                    <TasksLoading />
                ) : filteredAndSortedTasks.length ? (
                    <TaskList
                        tasks={filteredAndSortedTasks}
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                    />
                ) : (
                    <TasksNotFound />
                )}

            </div>
        </div>
    );
};

export default TaskPage;
