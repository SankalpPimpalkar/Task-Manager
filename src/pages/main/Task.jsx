import { Pencil } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { useParams } from "react-router-dom"
import appwrite from "../../api"
import DueDateFormat from "../../helpers/DueDateFormat"


export default function Task() {

    const { taskId } = useParams()
    const [task, setTask] = useState(null)
    const [isPendingGetTask, startGetPendingTaskTransition] = useTransition()

    useEffect(() => {
        startGetPendingTaskTransition(async () => {
            const resp = await appwrite.GET_TASK({ taskId })
            setTask(resp)
            console.log(resp)
        })
    }, [])

    return (
        <div className='pt-4 space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-600'>
                {task?.title}
            </h2>

            <div className='mt-6 w-full flex items-center justify-between'>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    {task?.project.name}
                </span>

                <div className='flex items-center gap-1'>
                    <button className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5 cursor-pointer'>
                        <Pencil size={20} className='p-0.5' />
                    </button>
                    <span className='bg-green-50 border border-green-300 rounded-md text-green-600 text-sm px-3 py-1.5'>
                        In Progress
                    </span>
                </div>
            </div>

            <p className='text-sm text-gray-500'>
                {task?.description}
            </p>

            <div className='flex items-center gap-1'>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    Assigned to {task?.assigned_to.name}
                </span>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    {DueDateFormat(task?.due_date)}
                </span>
            </div>
        </div>
    )
}
