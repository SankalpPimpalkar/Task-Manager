import { X, Text, Type, Flag, Calendar, User, Folder, Loader2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import InputField from '../../components/ui/InputField'
import { useEffect, useState, useTransition } from 'react'
import { CREATE_TASK, GET_PROJECT_BY_ID } from '../../appwrite/database'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function CreateTask({ onClose, isOpen, tasks, setTasks }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        assignee: '',
        project: ''
    })
    const user = useSelector(state => state.auth.user)
    const [selectedProject, setSelectedProject] = useState(null)
    const [members, setMembers] = useState([])

    const [isPendingCreateTask, startCreateTaskTransition] = useTransition()
    const [isPendingFetchProject, startFetchProjectTransition] = useTransition()
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target

        if (name === 'project') {
            setSelectedProject(value)
        }

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        startCreateTaskTransition(async () => {
            const resp = await CREATE_TASK(formData)
            if (resp) {
                toast.success(`Task "${resp.title}" created successfully`)
                setTasks([...tasks, resp])
                onClose()
            }
        })
    }

    function handleClear() {
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            due_date: '',
            assignee: '',
            project: ''
        })
        setSelectedProject(null)
        setMembers([])
    }

    function fetchProject() {
        startFetchProjectTransition(async () => {
            if (!selectedProject) return

            const project = await GET_PROJECT_BY_ID(selectedProject)

            if (project) {
                setMembers(project.members)
            }
        })
    }

    useEffect(() => {
        fetchProject()
    }, [selectedProject])

    if (!isOpen) return null

    return (
        <div className='w-full h-full fixed top-0 left-0 bg-black/30 flex items-center justify-center z-50 md:p-4'>
            <div className='bg-white md:rounded-lg p-6 w-full max-w-2xl relative max-h-full md:max-h-[95vh] overflow-y-auto'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                >
                    <X size={20} />
                </button>

                <div className="space-y-1 mb-4">
                    <h1 className='font-bold text-lg md:text-xl'>Create New Task</h1>
                    <p className='text-xs text-gray-500'>
                        Fill in the details to create a new task.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <InputField
                                type='text'
                                id={'title'}
                                name={'title'}
                                label={'Title'}
                                placeholder={'Task title'}
                                icon={Type}
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <div className="space-y-1">
                                <label htmlFor="description" className='text-xs font-medium text-gray-700'>
                                    Description
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none pl-9"
                                        placeholder="Task description..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    <Text className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="space-y-1">
                            <label htmlFor="priority" className='text-xs font-medium text-gray-700'>
                                Priority
                            </label>
                            <div className="relative">
                                <select
                                    id="priority"
                                    name="priority"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none pl-9 appearance-none"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <Flag className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1">
                            <InputField
                                type='date'
                                id={'due_date'}
                                name={'due_date'}
                                label={'Due Date'}
                                placeholder={'Select due date'}
                                icon={Calendar}
                                value={formData.due_date}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Project */}
                        <div className="space-y-1">
                            <label htmlFor="project" className='text-xs font-medium text-gray-700'>
                                Project
                            </label>
                            <div className="relative">
                                <select
                                    id="project"
                                    name="project"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none pl-9 appearance-none"
                                    value={formData.project}
                                    onChange={handleChange}
                                >
                                    <option value="">Select project</option>
                                    {user?.projects?.map(project => (
                                        <option key={project.$id} value={project.$id}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>
                                <Folder className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            </div>
                        </div>

                        {/* Assignee */}
                        <div className="space-y-1">
                            <label htmlFor="assignee" className='text-xs font-medium text-gray-700'>
                                Assignee
                            </label>
                            <div className="relative">
                                <select
                                    id="assignee"
                                    name="assignee"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none pl-9 appearance-none"
                                    value={formData.assignee}
                                    onChange={handleChange}
                                    disabled={!selectedProject}
                                >
                                    <option value="">Select assignee</option>
                                    {members?.map(user => (
                                        <option key={user.$id} value={user.$id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                {
                                    isPendingFetchProject ? (
                                        <Loader2 className="absolute left-3 top-2.5 text-gray-400 animate-spin" size={16} />
                                    ) : (
                                        <User className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-row-reverse gap-3 pt-4'>
                        <Button isLoading={isPendingCreateTask}>
                            Create Task
                        </Button>
                        <Button
                            type='button'
                            onClick={handleClear}
                            className='bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}