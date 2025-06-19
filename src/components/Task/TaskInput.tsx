import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientTask } from "@/types/task.types";
import { useTaskActions } from "@/actions/useTaskActions";
import { TaskFormInput, taskSchema } from "@/utils/validation";


const TaskInput = () => {

    const { createTask } = useTaskActions()
    const id = uuidv4();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TaskFormInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "low",
        },
    });

    const onSubmit = (data: TaskFormInput) => {
        if (data.title.trim() && data.priority && data.description.trim()) {
            const task: ClientTask = {
                _id: id,
                title: data.title,
                description: data.description,
                priority: data.priority,
                completed: false,
            };
            createTask(task);
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

            <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            minLength={3}
                            maxLength={30}
                            placeholder="Task Title..."
                            {...register("title")}
                            className="w-full flex-1 bg-black/20 text-gray-700 placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1344D8] border border-white/10 font-bold"
                        />
                        <div className="min-h-5 mt-1">
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex-1">
                        <div className="flex items-center flex-1">
                            <select
                                {...register("priority")}
                                className="min-h-13 bg-black/20 text-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1344D8] border border-white/10 cursor-pointer"
                            >
                                <option value="low" className="text-black">Low Priority</option>
                                <option value="medium" className="text-black">Medium Priority</option>
                                <option value="high" className="text-black">High Priority</option>
                            </select>
                        </div>
                        <div className="min-h-5 mt-1">
                            {errors.priority && (
                                <p className="text-red-500 text-sm">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            minLength={3}
                            maxLength={100}
                            {...register("description")}
                            placeholder="Task Description..."
                            className="w-full flex-1 bg-black/20 text-gray-700 placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1344D8] border-white/10"
                        />
                        <div className="min-h-5 mt-1">
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => onSubmit}
                            className="w-30 h-12 py-3 bg-gradient-to-l from-[#1447E5] to-gray-900 text-white px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-103 hover:ring-2 hover:ring-[#adadad] cursor-pointer"
                        >
                            <Plus size={18} /> Add
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default TaskInput;
