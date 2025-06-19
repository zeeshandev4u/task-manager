import { motion } from "framer-motion";

const TasksNotFound = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
    >
        <p className="text-white">No tasks found</p>
    </motion.div>
);

export default TasksNotFound;
