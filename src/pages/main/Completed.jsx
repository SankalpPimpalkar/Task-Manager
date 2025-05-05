import { useEffect, useState } from 'react'
import TaskItem from '../../components/TaskItem'
import TaskSkeleton from '../../components/skeletons/TaskSkeleton'

// Copy of initialTasks (or import it if you store it in a shared file)
const initialTasks = [
    {
        "id": 1,
        "title": "Update Passwords",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolorum nemo, impedit molestias inventore aliquam numquam at qui deserunt.",
        "date": "23/10/2023",
        "status": "Completed"
    },
    {
        "id": 4,
        "title": "Fix Login Bug",
        "description": "Resolve issue where users are unable to log in after password reset.",
        "date": "10/11/2023",
        "status": "Completed"
    },
    {
        "id": 7,
        "title": "Client Meeting",
        "description": "Discuss project updates and gather requirements for phase 2.",
        "date": "20/11/2023",
        "status": "Completed"
    },
    {
        "id": 8,
        "title": "Optimize Images",
        "description": "Compress and resize all product images for faster load times.",
        "date": "22/11/2023",
        "status": "Completed"
    },
    {
        "id": 11,
        "title": "Set Up CI/CD Pipeline",
        "description": "Configure automatic builds and deployments with GitHub Actions.",
        "date": "30/11/2023",
        "status": "Completed"
    },
    {
        "id": 14,
        "title": "Conduct Usability Testing",
        "description": "Gather feedback from users on the new UI changes.",
        "date": "08/12/2023",
        "status": "Completed"
    },
    {
        "id": 17,
        "title": "Prepare Demo",
        "description": "Create a presentation and live demo for the stakeholders meeting.",
        "date": "15/12/2023",
        "status": "Completed"
    },
    {
        "id": 19,
        "title": "Monitor System Performance",
        "description": "Track CPU and memory usage after the latest deployment.",
        "date": "20/12/2023",
        "status": "Completed"
    }
]

export default function Completed() {
    const [isLoading, setIsLoading] = useState(true)
    const [completedTasks, setCompletedTasks] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            const filtered = initialTasks.filter(task => task.status === 'Completed')
            setCompletedTasks(filtered)
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col h-[calc(100dvh-40px)]'>
            <h1 className='text-2xl font-bold text-white mb-6'>
                Completed Tasks
            </h1>

            <div className='flex-1 overflow-y-auto'>
                {isLoading ? (
                    <TaskSkeleton />
                ) : (
                    <ul className='space-y-4 pr-2'>
                        {completedTasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
