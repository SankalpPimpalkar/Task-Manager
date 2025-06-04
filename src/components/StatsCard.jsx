
export default function StatsCard({ statsData }) {

    return (
        <div className='pt-6 grid grid-cols-2 md:grid-cols-4 gap-2'>
            <div className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                <h6 className='text-gray-700 text-xl font-semibold'>
                    {statsData.remaining_tasks}
                </h6>
                <p className='text-xs text-gray-500'>
                    Remaining Tasks
                </p>
            </div>
            <div className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                <h6 className='text-gray-700 text-xl font-semibold'>
                    {statsData.completed_tasks}
                </h6>
                <p className='text-xs text-gray-500'>
                    Completed Tasks
                </p>
            </div>
            <div className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                <h6 className='text-gray-700 text-xl font-semibold'>
                    {statsData.total_tasks}
                </h6>
                <p className='text-xs text-gray-500'>
                    Total Tasks
                </p>
            </div>
            <div className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                <h6 className='text-gray-700 text-xl font-semibold'>
                    {statsData.total_projects}
                </h6>
                <p className='text-xs text-gray-500'>
                    Total Projects
                </p>
            </div>
        </div>
    )
}
