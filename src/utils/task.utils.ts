import { ClientTask } from "@/types/task.types";

export const getPriorityOrder = (priority: ClientTask["priority"]) => {
    return { high: 1, medium: 2, low: 3 }[priority];
};

export const sortTasks = (
    tasks: ClientTask[],
    search: string,
    criteria: "date" | "priority" | "alphabetical" | "completion",
    direction: "asc" | "desc"
) => {
    const multiplier = direction === "desc" ? -1 : 1;

    return [...tasks]
        .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            switch (criteria) {
                case "priority":
                    return (
                        (getPriorityOrder(b.priority) - getPriorityOrder(a.priority)) *
                        multiplier
                    );
                case "alphabetical":
                    return a.title.localeCompare(b.title) * multiplier;
                case "completion":
                    return ((a.completed === b.completed ? 0 : a.completed ? 1 : -1) * multiplier);
                case "date":
                default:
                    return (
                        new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
                    ) * multiplier;
            }
        });
};

export const getPriorityColor = (priority: ClientTask["priority"]) => {
    return {
        high: "text-red-400",
        medium: "text-yellow-400",
        low: "text-blue-400",
    }[priority];
};
