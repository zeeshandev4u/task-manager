export interface FetchTask {
    _id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
    userId: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type DuplicateKeyError = {
    code: number;
    keyPattern?: Record<string, unknown>;
    keyValue?: Record<string, unknown>;
};

export interface ClientTask {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    createdAt?: string;
}

export type NewTaskState = {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
};

export interface NewTaskInput {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
}

export interface FetchTasksApiResponse {
    data: {
        data: FetchTask[];
    };
    message?: string;
    status?: number;
}

