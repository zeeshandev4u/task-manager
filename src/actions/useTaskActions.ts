'use client'

import { useCallback } from "react";
import { toast } from "sonner";
import { useTaskStore } from "@/stores/taskStore";
import { createTaskByAPI, updateTaskFromAPI, deleteTaskFromAPI, fetchTasksFromAPI } from "@/lib/manage-apis/Task";
import { ClientTask, NewTaskInput } from "@/types/task.types";

export const useTaskActions = () => {
    const { setTasks, toggleLoading, setUpdatingTaskId, setDeletingTaskId } = useTaskStore();

    const fetchTasks = useCallback(async () => {
        try {
            toggleLoading(true);
            const { data: { data: tasks } } = await fetchTasksFromAPI();
            setTasks(tasks);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            toggleLoading(false);
        }
    }, [setTasks, toggleLoading]);

    const createTask = async (newTask: NewTaskInput) => {
        try {
            toggleLoading(true);
            await createTaskByAPI(newTask);
            await fetchTasks();
            toast.success("Task created successfully!");
        } catch (err) {
            console.error("Error creating task", err);
            toast.error("creating task failed!");
        } finally {
            toggleLoading(false);
        }
    };

    const updateTask = async (id: string, updates: Partial<ClientTask>) => {
        try {
            setUpdatingTaskId(id);
            await updateTaskFromAPI(id, updates);
            await fetchTasks();
        } catch (err) {
            console.error("Error updating task", err);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            setDeletingTaskId(id);
            await deleteTaskFromAPI(id);
            await fetchTasks();
            toast.success("Task deleted successfully!");
        } catch (err) {
            console.error("Error deleting task", err);
            toast.error("Failed to delete task.");
        } finally {
            setDeletingTaskId(null);
        }
    };


    return { fetchTasks, createTask, deleteTask, updateTask };
};
