import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { ClientTask } from "@/types/task.types";

interface Props {
    tasks: ClientTask[];
    editIndex: string | null;
    setEditIndex: (i: string | null) => void;
}

const TaskList: React.FC<Props> = ({
    tasks,
    editIndex,
    setEditIndex,
}) => {
    return (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-250px)]">
            <AnimatePresence>
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default TaskList;
