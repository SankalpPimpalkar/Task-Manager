import { useEffect, useState, useTransition } from 'react'
import { GET_ALL_TASKS } from '../../appwrite/database'
import { toast } from 'react-toastify'
import Button from '../../components/ui/Button'
import { Plus } from 'lucide-react'
import Task from '../../components/ui/Task'
import CreateTask from '../../components/modals/CreateTask'

function TaskSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 animate-pulse min-w-sm">
            <div className="w-full flex items-center justify-between">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex-1 min-w-0 pt-2 space-y-3">
                <div className="h-5 w-full bg-gray-200 rounded"></div>

                <div className="space-y-1">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-200">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default function Tasks() {
    const [isPendingTasks, startPendingTasksTransition] = useTransition()
    const [tasks, setTasks] = useState([])
    const [isCreatetaskModalOpen, setIsCreatetaskModalOpen] = useState(false)

    function handleFetchTasks() {
        startPendingTasksTransition(async () => {
            const resp = await GET_ALL_TASKS()
            if (resp) {
                setTasks(resp)
            }
        })
    }

    useEffect(() => {
        handleFetchTasks()
    }, [])

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                    All Tasks
                </h1>
                <div>
                    <Button onClick={() => setIsCreatetaskModalOpen(true)} className='bg-gray-800 text-xs font-medium p-2 md:p-3'>
                        <p className='hidden md:block'>New Task</p>
                        <Plus size={18} />
                    </Button>
                </div>
            </div>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[calc(100vh-120px)] overflow-y-auto w-full'>
                {isPendingTasks ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <TaskSkeleton key={index} />
                    ))
                ) : (
                    tasks.length > 0 ? tasks.map(task => (
                        <Task key={task.$id} task={task} />
                    )) : (
                        <p className='text-sm text-gray-400'>
                            No Tasks yet
                        </p>
                    )
                )}
            </div>

            <CreateTask tasks={tasks} setTasks={setTasks} isOpen={isCreatetaskModalOpen} onClose={() => setIsCreatetaskModalOpen(false)}/>
        </div>
    )
}