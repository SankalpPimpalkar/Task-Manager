import React from 'react'

export default function ProjectSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 animate-pulse">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-6 w-2/3 rounded bg-[#2a2d3a]"></div>
                        <div className="h-5 w-5 rounded bg-[#2a2d3a]"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                        <div className="h-4 w-full rounded bg-[#2a2d3a]"></div>
                        <div className="h-4 w-5/6 rounded bg-[#2a2d3a]"></div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="h-6 w-24 rounded-full bg-[#2a2d3a]"></div>
                        <div className="h-6 w-20 rounded-full bg-[#2a2d3a]"></div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-xs text-[#8a8d9b]">
                            <div className="h-3 w-16 rounded bg-[#2a2d3a]"></div>
                            <div className="h-3 w-8 rounded bg-[#2a2d3a]"></div>
                        </div>
                        <div className="w-full bg-[#1d1f29] rounded-full h-1.5">
                            <div className="bg-[#2a2d3a] h-1.5 rounded-full w-1/2"></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-xs text-[#8a8d9b]">
                        <div className="h-4 w-28 rounded bg-[#2a2d3a]"></div>
                        <div className="h-4 w-28 rounded bg-[#2a2d3a]"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
