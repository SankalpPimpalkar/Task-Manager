import { Pencil } from "lucide-react"
import { useParams } from "react-router-dom"


export default function Task() {

    const { taskId } = useParams()

    return (
        <div className='pt-4 space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-600'>
                Design Landing Page
            </h2>

            <div className='mt-6 w-full flex items-center justify-between'>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    Web Redesign
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, vel! Saepe minus aut quia quasi sequi culpa natus quam eum! Aspernatur recusandae porro tempora, aut, deserunt harum veritatis beatae id quidem eligendi ullam accusantium, optio placeat. Voluptas repellendus, obcaecati laborum architecto tempora debitis nam omnis necessitatibus nostrum reiciendis vero voluptatum.
            </p>

            <div className='flex items-center gap-1'>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    Assigned to you
                </span>
                <span className='bg-gray-50 border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-1.5'>
                    Due Tommorrow
                </span>
            </div>
        </div>
    )
}
