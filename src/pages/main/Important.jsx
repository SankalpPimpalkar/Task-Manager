import { Delete, Edit, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuBar from '../../components/MenuBar'
import TaskSkeleton from '../../components/skeletons/TaskSkeleton'
import TaskItem from '../../components/TaskItem'

const initialTasks = [
    {
        "id": 1,
        "title": "Update Passwords",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolorum nemo, impedit molestias inventore aliquam numquam at qui deserunt.",
        "date": "23/10/2023",
        "status": "Completed"
    },
    {
        "id": 2,
        "title": "Backup Database",
        "description": "Ensure all data is backed up before scheduled maintenance.",
        "date": "01/11/2023",
        "status": "In Progress"
    },
    {
        "id": 3,
        "title": "Design Homepage Layout",
        "description": "Create a wireframe and mockup for the new homepage design.",
        "date": "05/11/2023",
        "status": "Pending"
    },
    {
        "id": 4,
        "title": "Fix Login Bug",
        "description": "Resolve issue where users are unable to log in after password reset.",
        "date": "10/11/2023",
        "status": "Completed"
    },
    {
        "id": 5,
        "title": "Write Unit Tests",
        "description": "Add unit tests for the authentication module.",
        "date": "12/11/2023",
        "status": "In Progress"
    },
    {
        "id": 6,
        "title": "Review Pull Requests",
        "description": "Go through the list of open PRs and provide feedback.",
        "date": "15/11/2023",
        "status": "Pending"
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
        "id": 9,
        "title": "Migrate Server",
        "description": "Move services to the new cloud infrastructure.",
        "date": "25/11/2023",
        "status": "In Progress"
    },
    {
        "id": 10,
        "title": "Update Documentation",
        "description": "Ensure all API documentation is up to date with the latest changes.",
        "date": "28/11/2023",
        "status": "Pending"
    },
    {
        "id": 11,
        "title": "Set Up CI/CD Pipeline",
        "description": "Configure automatic builds and deployments with GitHub Actions.",
        "date": "30/11/2023",
        "status": "Completed"
    },
    {
        "id": 12,
        "title": "Security Audit",
        "description": "Perform a full security audit of the system and report findings.",
        "date": "02/12/2023",
        "status": "In Progress"
    },
    {
        "id": 13,
        "title": "Write Blog Post",
        "description": "Draft and publish an article about our latest product update.",
        "date": "05/12/2023",
        "status": "Pending"
    },
    {
        "id": 14,
        "title": "Conduct Usability Testing",
        "description": "Gather feedback from users on the new UI changes.",
        "date": "08/12/2023",
        "status": "Completed"
    },
    {
        "id": 15,
        "title": "Launch Marketing Campaign",
        "description": "Coordinate with the marketing team to launch new ad campaigns.",
        "date": "10/12/2023",
        "status": "Pending"
    },
    {
        "id": 16,
        "title": "Clean Up Codebase",
        "description": "Refactor legacy code and remove unused libraries.",
        "date": "12/12/2023",
        "status": "In Progress"
    },
    {
        "id": 17,
        "title": "Prepare Demo",
        "description": "Create a presentation and live demo for the stakeholders meeting.",
        "date": "15/12/2023",
        "status": "Completed"
    },
    {
        "id": 18,
        "title": "Add Multi-language Support",
        "description": "Implement localization for Spanish and French.",
        "date": "18/12/2023",
        "status": "In Progress"
    },
    {
        "id": 19,
        "title": "Monitor System Performance",
        "description": "Track CPU and memory usage after the latest deployment.",
        "date": "20/12/2023",
        "status": "Completed"
    },
    {
        "id": 20,
        "title": "Send Holiday Greetings",
        "description": "Email greeting cards to clients and partners.",
        "date": "22/12/2023",
        "status": "Pending"
    },
    {
        id: 21,
        title: "Review Compliance Policy",
        description: "Ensure all departments are following the latest security and privacy policies.",
        date: "24/12/2023",
        status: "Important"
    },
    {
        id: 22,
        title: "Renew SSL Certificates",
        description: "Update SSL certs to avoid expiration warnings on the production site.",
        date: "26/12/2023",
        status: "Important"
    },
    {
        id: 23,
        title: "Handle Legal Notice",
        description: "Respond to the recent legal notice from the vendor regarding license usage.",
        date: "28/12/2023",
        status: "Important"
    },
    {
        id: 24,
        title: "Escalated Client Support Ticket",
        description: "Resolve the high-priority ticket raised by a key enterprise client.",
        date: "29/12/2023",
        status: "Important"
    },
    {
        id: 25,
        title: "Critical Security Patch",
        description: "Apply emergency security patch to backend services.",
        date: "30/12/2023",
        status: "Important"
    }
]

export default function Important() {
    const [isLoading, setIsLoading] = useState(true)
    const [importantTasks, setImportantTasks] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            const filtered = initialTasks.filter(task => task.status === 'Important')
            setImportantTasks(filtered)
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col h-[calc(100dvh-40px)]'>
            <h1 className='text-2xl font-bold text-white mb-6'>
                Important Tasks
            </h1>

            <div className='flex-1 overflow-y-auto'>
                {isLoading ? (
                    <TaskSkeleton />
                ) : (
                    <ul className='space-y-4 pr-2'>
                        {importantTasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
