import React from 'react'
import useAuth from '../../hooks/useAuth'
import StatsCard from '../../components/StatsCard'
import ProjectsSection from '../../components/ProjectsSection'

export default function Home() {

    const { user } = useAuth()

    return (
        <div className='pt-4'>
            <h3 className='text-2xl font-bold text-gray-700 text-pretty'>
                Welcome back, {user?.name} 👋
            </h3>

            <StatsCard />

            <div className='pt-6 space-y-4'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Your Projects
                </h4>

                <ProjectsSection />
            </div>
        </div>
    )
}
