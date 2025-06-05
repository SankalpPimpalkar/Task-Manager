
export default function StatsCard({ statsData = [] }) {

    return (
        <div className='pt-6 grid grid-cols-2 md:grid-cols-4 gap-2'>
            {
                statsData.map((data, index) => (
                    <div key={index} className='border border-gray-300 bg-gray-50 p-4 rounded-md space-y-1'>
                        <h6 className='text-gray-700 text-xl font-semibold'>
                            {data.count}
                        </h6>
                        <p className='text-xs text-gray-500'>
                            {data.name}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}
