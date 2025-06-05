import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import StatsCard from '../../components/StatsCard'
import ProjectsSection from '../../components/ProjectsSection'

export default function Home() {

    const { user } = useAuth();
    const [statsData, setStatsData] = useState([])

    useEffect(() => {
        if (user) {
            setStatsData([
                {
                    count: user.tasks?.filter(task => !task.is_completed)?.length || 0,
                    name: 'Remaining Tasks'
                },
                {
                    count: user.tasks?.filter(task => task.is_completed)?.length || 0,
                    name: 'Completed Tasks'
                },
                {
                    count: user.tasks?.length || 0,
                    name: 'Total Tasks'
                },
                {
                    count: user.projects?.length || 0,
                    name: 'Total Projects'
                },
            ]);
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
