import { ClientTask, FetchTasksApiResponse, NewTaskInput } from "@/types/task.types";

export async function fetchTasksFromAPI(): Promise<FetchTasksApiResponse> {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch tasks from API");
    }
    const data: FetchTasksApiResponse = await res.json();
    return data;
}

export async function createTaskByAPI(newTask: NewTaskInput): Promise<FetchTasksApiResponse> {
    const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create task");
    }
    const data: FetchTasksApiResponse = await res.json();
    return data;
}

export async function updateTaskFromAPI(
    id: string,
    updates: Partial<ClientTask>
): Promise<{ updatedTask: ClientTask }> {
    const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update task");
    }

    const data = await res.json();
    return { updatedTask: data };
}

export async function deleteTaskFromAPI(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete task");
    }
    return { success: true };
}