import { useState, useEffect } from 'react'
import TaskSkeleton from '../../components/skeletons/TaskSkeleton'
import TaskItem from '../../components/TaskItem'
import { GET_ALL_TASKS } from '../../appwrite/database'
import { useDispatch } from 'react-redux'
import { loadTasks } from '../../redux/slices/task.slice'


export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch()

    const fetchTasks = async () => {
        try {
            const resp = await GET_ALL_TASKS()
            if (resp) {
                console.log(resp)
                setTasks(resp)
                dispatch(loadTasks(resp))
            }

        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Simulate loading data
    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col h-[calc(100dvh-40px)]'>
            {/* Fixed Header */}
            <div className='pb-6'>
                <h1 className='text-2xl font-bold text-white'>
                    All Tasks
                </h1>
            </div>

            {/* Scrollable Tasks Area */}
            <div className='flex-1 overflow-y-auto'>
                {isLoading ? (
                    <TaskSkeleton />
                ) : (
                    <ul className='space-y-4 pr-2'>
                        {tasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}