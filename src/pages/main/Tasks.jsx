import { useEffect, useState, useTransition } from 'react'
import { GET_ALL_TASKS } from '../../appwrite/database'
import { toast } from 'react-toastify'
import Button from '../../components/ui/Button'
import { Plus } from 'lucide-react'
import Task from '../../components/ui/Task'

function TaskSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 animate-pulse min-w-sm">
            {/* Status icon and priority badge row */}
            <div className="w-full flex items-center justify-between">
                {/* Status icon skeleton */}
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                {/* Priority badge skeleton */}
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex-1 min-w-0 pt-2 space-y-3">
                {/* Title */}
                <div className="h-5 w-full bg-gray-200 rounded"></div>

                {/* Description (2 lines) */}
                <div className="space-y-1">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                </div>

                {/* Project info */}
                <div className="flex items-center gap-2">
                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>

                {/* Due date and assignee */}
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

    function handleFetchTasks() {
        startPendingTasksTransition(async () => {
            const resp = await GET_ALL_TASKS()
            if (resp) {
                setTasks(resp)
                toast.success('Tasks data fetched successfully')
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
                    <Button className='bg-gray-800 text-xs md:text-sm font-medium py-3'>
                        New Task
                        <Plus size={18} />
                    </Button>
                </div>
            </div>

            {/* Tasks container with fixed height and scroll */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[calc(100vh-120px)] overflow-y-auto w-full'>
                {isPendingTasks ? (
                    // Show 6 skeleton loaders while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <TaskSkeleton key={index} />
                    ))
                ) : (
                    // Show actual tasks when loaded
                    tasks.map(task => (
                        <Task key={task.$id} task={task} />
                    ))
                )}
            </div>
        </div>
    )
}