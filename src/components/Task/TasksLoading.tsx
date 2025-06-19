import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const TasksLoading = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
    >
        <div className="w-full min-h-80  flex justify-center items-center">
            <Loader
                size={30}
                className=" m-3 text-[#ececec] animate-spin"
                style={{ animationDuration: "5s" }}
            />

            <p className="m-2  text-3xl text-[#ececec] animate-pulse">Loading tasks...</p>
        </div>
    </motion.div>
);

export default TasksLoading;
