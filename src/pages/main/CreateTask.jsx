import { useEffect, useState } from "react";
import { ChevronLeft, Check, Calendar, User, ClipboardList, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CREATE_TASK, GET_PROJECTS_BY_MEMBER } from "../../appwrite/database";

export default function CreateTask() {
    const navigate = useNavigate();
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
        assignee: "",
        project: ""
    });
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectChange = (e) => {
        const projectId = e.target.value;
        const selectedProject = projects.find(project => project.$id === projectId);
        
        setTaskForm(prev => ({
            ...prev,
            project: projectId,
            assignee: "" 
        }));

        if (selectedProject) {
            setTeamMembers(selectedProject.members || []);
        } else {
            setTeamMembers([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreatingTask(true);

        try {
            const resp = await CREATE_TASK(taskForm)

            if(resp) {
                navigate('/')
            }

        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsCreatingTask(false);
        }
    };

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const resp = await GET_PROJECTS_BY_MEMBER();
            setProjects(resp || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col md:h-[calc(100dvh-40px)]'>
                <div className='flex justify-between items-center pb-6'>
                    <div className="h-10 w-24 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="hidden md:block h-8 w-48 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                </div>
                <div className="space-y-6">
                    <div className="h-20 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-20 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                        <div className="h-20 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                        <div className="h-20 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                        <div className="h-20 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col md:h-[calc(100dvh-40px)]'>
            {/* Fixed Header */}
            <div className='flex justify-between items-center pb-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2d3a] bg-[#1d1f29] text-[#d1d5db] hover:bg-[#2a2d3a] hover:text-white transition-colors duration-200'
                >
                    <ChevronLeft size={18} />
                    Back
                </button>
                <h1 className='text-2xl font-bold text-white hidden md:block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text'>
                    Create Task
                </h1>
                <button
                    onClick={handleSubmit}
                    disabled={isCreatingTask || !taskForm.title || !taskForm.project}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isCreatingTask || !taskForm.title || !taskForm.project ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600'} text-white transition-colors duration-200`}
                >
                    {isCreatingTask ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        <>
                            <Check size={18} strokeWidth={3} />
                            Create Task
                        </>
                    )}
                </button>
            </div>

            <h1 className='text-2xl font-bold text-white block md:hidden pb-4'>
                Create Task
            </h1>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 mb-16 md:mb-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task Title */}
                    <div>
                        <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                            Task Title <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <ClipboardList size={16} />
                            </div>
                            <input
                                type="text"
                                name="title"
                                value={taskForm.title}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200"
                                placeholder="Enter task title"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={taskForm.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200"
                            placeholder="Describe the task in detail..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Priority */}
                        <div>
                            <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                                Priority
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <AlertTriangle size={16} />
                                </div>
                                <select
                                    name="priority"
                                    value={taskForm.priority}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none appearance-none transition-all duration-200"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                                Due Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={taskForm.due_date}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Project */}
                        <div>
                            <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                                Project <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <select
                                    name="project"
                                    value={taskForm.project}
                                    onChange={handleProjectChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none appearance-none transition-all duration-200"
                                >
                                    <option value="">Select project</option>
                                    {projects.map(project => (
                                        <option key={project.$id} value={project.$id}>{project.title}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Assignee */}
                        <div>
                            <label className="block text-[#8a8d9b] text-sm font-medium mb-2">
                                Assignee
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <User size={16} />
                                </div>
                                <select
                                    name="assignee"
                                    value={taskForm.assignee}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none appearance-none transition-all duration-200"
                                    disabled={!taskForm.project}
                                >
                                    <option value="">Select team member</option>
                                    {teamMembers.map(member => (
                                        <option key={member.$id} value={member.$id}>{member.name || member.username}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}