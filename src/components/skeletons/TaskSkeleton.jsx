import React from 'react'

export default function TaskSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-4 animate-pulse">
                    <div className="flex justify-between mb-3">
                        <div className="h-6 w-3/4 rounded bg-[#2a2d3a]"></div>
                        <div className="h-6 w-6 rounded bg-[#2a2d3a]"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="h-4 w-full rounded bg-[#2a2d3a]"></div>
                        <div className="h-4 w-5/6 rounded bg-[#2a2d3a]"></div>
                        <div className="h-4 w-4/6 rounded bg-[#2a2d3a]"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-4 w-1/4 rounded bg-[#2a2d3a]"></div>
                        <div className="flex space-x-3">
                            <div className="h-6 w-16 rounded-full bg-[#2a2d3a]"></div>
                            <div className="flex space-x-2">
                                <div className="h-6 w-6 rounded-md bg-[#2a2d3a]"></div>
                                <div className="h-6 w-6 rounded-md bg-[#2a2d3a]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
