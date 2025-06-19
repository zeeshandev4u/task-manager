import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from 'dayjs';
import { Calendar, Check, Edit2, Flag, Save, Trash2, Loader, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { ClientTask, NewTaskState } from "@/types/task.types";
import { getPriorityColor } from "@/utils/task.utils";
import { useTaskActions } from "@/actions/useTaskActions";
import { useTaskStore } from "@/stores/taskStore";

interface TaskItemProps {
    task: ClientTask;
    editIndex: string | null;
    setEditIndex: (index: string | null) => void;
}
interface UpdateTaskData {
    title?: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    completed?: boolean;
}

const TaskCard: React.FC<TaskItemProps> = ({
    task,
    editIndex,
    setEditIndex,
}) => {
    const { updatingTaskId, deletingTaskId } = useTaskStore()
    const { updateTask, deleteTask } = useTaskActions()

    const [editedTaskState, setEditedTaskState] = useState<NewTaskState>({
        title: task.title,
        description: task.description,
        priority: task.priority,
    });

    const isDeleting = deletingTaskId === task._id;
    const isUpdating = updatingTaskId === task._id;

    useEffect(() => {
        if (editIndex === task._id) {
            setEditedTaskState({
                title: task.title,
                description: task.description,
                priority: task.priority,
            });
        }
    }, [editIndex, task]);

    const toggleTaskCompletion = async (_id: string) => {
        try {
            await updateTask(_id, { completed: !task?.completed });
            toast.success("Status updated successfully!");
        } catch {
            toast.error("Status updated failed!");
        }

    };


    const handleEditChange = (field: keyof UpdateTaskData, value: string) => {
        setEditedTaskState(prev => ({ ...prev, [field]: value }));
    };

    const handleEditTask = (_id: string) => {
        setEditIndex(_id);
        setEditedTaskState({
            title: task.title,
            description: task.description,
            priority: task.priority,
        });
    };

    const saveEditTask = async (_id: string) => {

        if (!editedTaskState.title?.trim()) {
            toast.error("Task title cannot be empty.");
            return;
        }
        if (editedTaskState.title.length < 3 || editedTaskState.title.length > 30) {
            toast.error("Title must be between 3 and 30 characters.");
            return;
        }
        if (editedTaskState.description && (editedTaskState.description.length < 3 || editedTaskState.description.length > 100)) {
            toast.error("Description must be between 3 and 100 characters.");
            return;
        }

        const updatedFields: UpdateTaskData = {};
        if (editedTaskState.title !== task.title) {
            updatedFields.title = editedTaskState.title;
        }
        if (editedTaskState.description !== task.description) {
            updatedFields.description = editedTaskState.description;
        }
        if (editedTaskState.priority !== task.priority) {
            updatedFields.priority = editedTaskState.priority;
        }

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes to save.");
            setEditIndex(null);
            return;
        }
        await updateTask(_id, updatedFields);
        setEditIndex(null);

    };

    const handleDeleteTask = async (_id: string) => {
        deleteTask(_id)
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="group transform transition-all duration-300"
        >
            <div
                className={`backdrop-blur-xl rounded-lg border-t-4 shadow-lg ${task.completed
                    ? "bg-green-500/10 border-green-500/50"
                    : "bg-white/10 border-purple-500/50"
                    }`}
            >
                <div className="p-4">
                    <div className="flex items-start gap-4 mb-3">
                        {editIndex === null && <button
                            disabled={isUpdating}
                            onClick={() => task._id && toggleTaskCompletion(task._id)}
                            className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${task.completed
                                ? "bg-green-500/80 border-green-400"
                                : "border-white/30 hover:border-purple-400"
                                }`}
                        >
                            {isUpdating ? (
                                <Loader
                                    size={20}
                                    className=" text-[#ececec] animate-spin"
                                    style={{ animationDuration: "3s" }}
                                />
                            ) : task.completed ? (
                                <Check size={20} className="text-white" />
                            ) : null}
                        </button>}

                        <div className="flex-1 min-w-0 overflow-hidden">
                            {editIndex === task._id ? (
                                <>
                                    <input
                                        type="text"
                                        minLength={3}
                                        maxLength={30}
                                        className="w-full text-xl bg-black/20 text-white p-2 rounded-lg outline-none border border-white/20 font-bold"
                                        value={editedTaskState?.title}
                                        onChange={(e) => handleEditChange("title", e.target.value)}
                                    />
                                    <select
                                        value={editedTaskState?.priority}
                                        onChange={(e) => handleEditChange("priority", e.target.value)}
                                        className="w-full text-sm my-1 flex-1 bg-black/20 text-[#FFFFFF] rounded-lg px-4 py-3 outline-none border-white/20 cursor-pointer"
                                    >
                                        <option value="low" className="text-black">Low Priority</option>
                                        <option value="medium" className="text-black">Medium Priority</option>
                                        <option value="high" className="text-black">High Priority</option>
                                    </select>
                                    <textarea
                                        minLength={3}
                                        maxLength={100}
                                        className="w-full text-sm bg-black/20 text-white p-2 rounded-lg outline-none border border-white/20"
                                        value={editedTaskState?.description}
                                        onChange={(e) => handleEditChange("description", e.target.value)}
                                    />
                                </>
                            ) : (
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className={`text-xl font-bold ${task.completed
                                                ? "line-through text-gray-400"
                                                : "text-white"
                                                }`}
                                        >
                                            {task.title}
                                        </p>
                                        <Flag
                                            size={14}
                                            className={getPriorityColor(
                                                task.priority
                                            )}
                                        />
                                        <span className={getPriorityColor(
                                            task.priority)}
                                        >
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className={`text-sm ${task.completed
                                                ? "line-through text-gray-400"
                                                : "text-white"
                                                }`}
                                        >{task.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-2 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                            <span>{"Created Date: "}</span>
                            <Calendar size={12} />
                            <span>{dayjs(task.createdAt).format('MMMM D, YYYY')}</span>
                        </div>

                        <div className="flex gap-2">
                            {editIndex === task._id ? (
                                isUpdating ? (
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <Loader2 size={20} className=" text-[#ececec] animate-spin" />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => saveEditTask(task._id)}
                                        className="p-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                                    >
                                        <Save size={18} className="cursor-pointer" />
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={() => handleEditTask(task._id)}
                                    className="p-2 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                                >
                                    <Edit2 size={18} className="cursor-pointer" />
                                </button>
                            )}

                            {editIndex === null && (
                                isDeleting ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 size={20} className=" text-[#ececec] animate-spin" />
                                    </div>
                                ) : (
                                    <button
                                        disabled={isDeleting}
                                        onClick={() => handleDeleteTask(task._id!)}
                                        className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
                                    >
                                        <Trash2 size={18} className="cursor-pointer" />
                                    </button>
                                )
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;
