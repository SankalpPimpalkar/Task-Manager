import { Edit, Delete, CheckCircle2 } from 'lucide-react'

const statusColors = {
    "Completed": "text-emerald-400 bg-emerald-400/10",
    "In Progress": "text-yellow-400 bg-yellow-400/10",
    "Pending": "text-sky-400 bg-sky-400/10",
    "Important": "text-red-400 bg-red-400/10"
}

export default function TaskItem({ task }) {
    return (
        <li className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-4 hover:border-[#2a2d3a] transition-colors duration-200 relative'>
            <div className='flex justify-between items-start mb-2'>
                <h4 className='text-lg font-semibold text-white'>
                    {task.title}
                </h4>
                {/* You can pass MenuBar as a prop if needed */}
            </div>

            <p className='text-[#d1d5db] text-sm mb-4'>
                {task.description}
            </p>

            <div className='flex justify-between items-center'>
                <p className='text-[#8a8d9b] text-xs'>
                    {task.date}
                </p>

                <div className='flex items-center space-x-3'>
                    <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${statusColors[task.status] || 'text-white bg-gray-500/10'}`}>
                        <CheckCircle2 size={14} className='mr-1' />
                        {task.status}
                    </span>

                    <div className='flex space-x-2'>
                        <button className='p-1.5 text-[#8a8d9b] hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors duration-200'>
                            <Edit size={18} />
                        </button>
                        <button className='p-1.5 text-[#8a8d9b] hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors duration-200'>
                            <Delete size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
