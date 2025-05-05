import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

export default function MainLayout() {
    return (
        <div className='w-full min-h-dvh bg-[#030712] text-white'>
            <div className='container mx-auto md:p-5'>
                <div className='flex flex-col md:grid md:grid-cols-5 md:gap-5 w-full min-h-[calc(100dvh-40px)]'>
                    <div className='w-full md:col-span-1'>
                        <Sidebar />
                    </div>
                    <main className='w-full md:col-span-4'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
