import { ChangeEvent } from "react";
import { Search } from "lucide-react";

interface TaskSearchSortProps {
    sortCriteria: "date" | "priority" | "alphabetical" | "completion";
    setSortCriteria: React.Dispatch<React.SetStateAction<"date" | "priority" | "alphabetical" | "completion">>;
    sortDirection: "asc" | "desc";
    setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TaskSearchSort: React.FC<TaskSearchSortProps> = ({
    searchQuery,
    setSearchQuery,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
}) => {
    return (
        <div className="mb-6 space-y-4">
            <div className="flex gap-3 flex-col md:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/20 text-[#CCCCCC] pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#CCCCCC] transition-all border border-white/10"
                    />
                </div>

                <div className="flex gap-2">
                    <select
                        value={sortCriteria}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setSortCriteria(e.target.value as "date" | "priority" | "alphabetical" | "completion")
                        }
                        className="bg-black/20 text-white px-4 py-3 rounded-lg outline-none border border-white/10 hover:ring-2 hover:ring-[#CCCCCC] cursor-pointer"
                    >
                        <option value="date">Date</option>
                        <option value="priority">Priority</option>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="completion">Completion</option>
                    </select>
                    <button
                        onClick={() =>
                            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        className="px-4 bg-black/20 rounded-lg border border-white/10 hover:ring-2 hover:ring-[#CCCCCC] cursor-pointer"
                        title="Toggle sort direction"
                    >
                        {sortDirection === "asc" ? "A - Z" : "Z - A"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskSearchSort;
