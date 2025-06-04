import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import StatsCard from '../../components/StatsCard'
import ProjectsSection from '../../components/ProjectsSection'

export default function Home() {

    const { user } = useAuth();
    const [statsData, setStatsData] = useState({
        remaining_tasks: 0,
        completed_tasks: 0,
        total_tasks: 0,
        total_projects: 0,
    })

    useEffect(() => {
        if (user) {
            setStatsData({
                remaining_tasks: user.tasks?.filter(task => !task.is_completed)?.length || 0,
                completed_tasks: user.tasks?.filter(task => task.is_completed)?.length || 0,
                total_tasks: user.tasks?.length || 0,
                total_projects: user.projects?.length || 0,
            });
        }
    }, [user]);

    return (
        <div className='pt-4'>
            <h3 className='text-2xl font-bold text-gray-700 text-pretty'>
                Welcome back, {user?.name} 👋
            </h3>

            <StatsCard statsData={statsData} />

            <div className='pt-6 space-y-4'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Your Projects
                </h4>

                <ProjectsSection projects={user?.projects} />
            </div>
        </div>
    )
}
