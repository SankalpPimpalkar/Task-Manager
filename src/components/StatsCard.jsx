
export default function StatsCard() {
    return (
        <div className='pt-6 grid grid-cols-2 md:grid-cols-4 gap-2'>
            {
                [1, 2, 3, 4].map(stats => (
                    <div key={stats} className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                        <h6 className='text-gray-700 text-xl font-semibold'>
                            23
                        </h6>
                        <p className='text-xs text-gray-500'>
                            Total Tasks
                        </p>
                    </div>
                ))
            }
        </div>
    )
}
