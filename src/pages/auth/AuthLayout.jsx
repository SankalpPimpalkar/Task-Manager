import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className='w-full min-h-dvh bg-[#030712] text-white flex items-center justify-center'>
            <Outlet />
        </div>
    )
}
