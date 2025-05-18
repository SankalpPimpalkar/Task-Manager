import { Plus, Circle, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../components/ui/Button";
import { useEffect, useState, useTransition } from "react";
import { GET_ALL_TASKS } from "../../appwrite/database";
import { Link, useNavigate } from "react-router-dom";


function PriorityBadge({ priority }) {
    const priorityClasses = {
        urgent: "bg-red-100 text-red-800",
        high: "bg-orange-100 text-orange-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-green-100 text-green-800"
    };

    const priorityIcons = {
        urgent: <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />,
        high: <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />,
        medium: <Circle className="w-3 h-3 md:w-4 md:h-4" />,
        low: <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${priorityClasses[priority] || 'bg-gray-100'}`}>
            {priorityIcons[priority]}
            <span className="hidden sm:inline">{priority}</span>
        </span>
    );
}

function StatusIndicator({ status }) {
    const statusClasses = {
        Pending: "bg-yellow-100 text-yellow-800",
        "In Progress": "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800"
    };

    const statusIcons = {
        Pending: <Clock className="w-3 h-3 md:w-4 md:h-4" />,
        "In Progress": <Circle className="w-3 h-3 md:w-4 md:h-4" />,
        Completed: <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusClasses[status] || 'bg-gray-100'}`}>
            {statusIcons[status]}
            <span className="hidden sm:inline">{status}</span>
        </span>
    );
}

function MemberAvatar({ member }) {
    return (
        <div className="flex items-center">
            {member.avatar ? (
                <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full"
                />
            ) : (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                        {member.name?.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}
        </div>
    );
}

export default function Tasks() {
    const [isPendingFetchTasks, startFetchTasksTransition] = useTransition();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate()

    useEffect(() => {
        startFetchTasksTransition(async () => {
            const resp = await GET_ALL_TASKS();
            setTasks(resp);
        });
    }, []);

    const filteredTasks = tasks?.filter(task => {
        if (filter === "All") return true;
        return task.status === filter;
    });

    return (
        <div className="w-full h-full pb-2 space-y-4">
            <div className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                        Tasks
                    </h1>
                    <Button
                        className="text-sm text-gray-200 p-2 sm:px-4 flex items-center gap-1"
                        onClick={() => navigate('/tasks/create')}
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">New Task</span>
                    </Button>
                </div>

                <select className="border border-gray-200 bg-white rounded-md px-3 py-1.5 text-sm outline-none appearance-none md:w-fit cursor-pointer" onChange={(e) => setFilter(e.target.value)}>
                    <option defaultChecked value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTasks?.map(task => (
                    <Link
                        to={`/tasks/${task.$id}`}
                        key={task.$id}
                        className="border border-gray-200 bg-white p-3 sm:p-4 rounded-md hover:border-gray-300 w-full flex flex-col"
                    >
                        {/* Task Header */}
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                                {task.title}
                            </h2>
                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                {new Date(task.due_date).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Task Description */}
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                            {task.description}
                        </p>

                        {/* Priority and Status */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <PriorityBadge priority={task.priority} />
                            <StatusIndicator status={task.status} />
                        </div>

                        {/* Footer with Project and Assignees */}
                        <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 hidden sm:inline">Project:</span>
                                <span className="text-xs font-medium text-gray-700 line-clamp-1 max-w-[80px] sm:max-w-[100px]">
                                    {task.project?.title || "No project"}
                                </span>
                            </div>

                            <div className="flex -space-x-1">
                                <MemberAvatar member={task.assignee} />
                                {task.assigned_by && task.assigned_by.$id !== task.assignee.$id && (
                                    <MemberAvatar member={task.assigned_by} />
                                )}
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Empty State */}
                {filteredTasks.length === 0 && (
                    <div className="col-span-full text-center py-8">
                        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <Clock className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-700">No tasks found</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {filter === "All"
                                ? "Create your first task to get started"
                                : `No ${filter.toLowerCase()} tasks`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}