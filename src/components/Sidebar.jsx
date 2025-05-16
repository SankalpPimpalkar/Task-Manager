import React, { useState, useRef, useEffect, useTransition } from 'react'
import { LayoutDashboard, ListChecks, Settings, Folder, Plus, FolderGit2, LogOut, Menu, X, LogOutIcon, PanelRightClose } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LOGOUT_ACCOUNT } from '../appwrite/auth'
import { toast } from 'react-toastify'
import Button from './ui/Button'

export function MobileSidebar({ isOpen, setIsOpen }) {
    const location = useLocation()
    const user = useSelector(state => state.auth.user)
    const [isPendingLogout, startPendingLogoutTransition] = useTransition()
    const sidebarRef = useRef(null)
    const navigate = useNavigate()

    // Navigation items
    const navItems = [
        { path: "/", icon: FolderGit2, label: "Projects" },
        { path: "/tasks", icon: ListChecks, label: "Tasks" },
        { path: "/settings", icon: Settings, label: "Settings" }
    ]

    function handleSubmit(event) {
        event.preventDefault()
        startPendingLogoutTransition(async () => {
            const resp = await LOGOUT_ACCOUNT()
            if (resp) {
                toast('User logged out successfully')
                navigate('/auth/signin')
            }
        })
    }

    // Check if a link is active
    function isActive(path) {
        return location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path))
    }

    // Handle clicks outside the sidebar
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden"></div>
            )}

            {/* Mobile Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
            >
                <div className="p-4 h-full flex flex-col">
                    {/* Header with close button */}
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h1 className="font-bold text-xl text-gray-500">Task Manager</h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-md hover:bg-gray-100"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 space-y-2 flex-1 overflow-y-auto">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2">Navigation</p>
                        <nav className="flex flex-col space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-xs ${isActive(item.path) ? 'bg-gray-50 text-gray-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                    >
                                        <Icon size={18} className={isActive(item.path) ? 'text-gray-600' : 'text-gray-500'} />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Projects List */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between px-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</p>
                                <button className="text-gray-500 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="flex flex-col space-y-1">
                                {user?.projects?.map((project) => (
                                    <Link
                                        key={project.$id}
                                        to={`/projects/${project.$id}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-xs ${isActive(`/projects/${project.$id}`) ? 'bg-gray-50 text-gray-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                    >
                                        <Folder size={18} className={isActive(`/projects/${project.$id}`) ? 'text-gray-600' : 'text-gray-500'} />
                                        {project.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='absolute bottom-4 left-0 right-0 px-4 flex flex-col gap-4'>
                        <div
                            className='flex items-center gap-3 rounded-lg cursor-pointer relative'
                        >
                            <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium'>
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className='text-sm'>
                                <p className='font-medium'>
                                    {user?.name || 'User'}
                                </p>
                                <p className='text-xs text-gray-500'>
                                    {user?.occupation || 'Member'}
                                </p>
                            </div>
                        </div>

                        <Button
                            className='w-full py-3 text-sm justify-between'
                            type='button'
                            onClick={handleSubmit}
                            isLoading={isPendingLogout}
                        >
                            Logout
                            <LogOutIcon size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

// Original Desktop Sidebar (renamed for clarity)
export function DesktopSidebar() {
    const location = useLocation()
    const user = useSelector(state => state.auth.user)
    const [isPendingLogout, startPendingLogoutTransition] = useTransition()
    const profileRef = useRef(null)
    const navigate = useNavigate()

    // Navigation items
    const navItems = [
        { path: "/", icon: FolderGit2, label: "Projects" },
        { path: "/tasks", icon: ListChecks, label: "Tasks" },
        { path: "/settings", icon: Settings, label: "Settings" }
    ]

    function handleSubmit(event) {
        event.preventDefault()
        startPendingLogoutTransition(async () => {
            const resp = await LOGOUT_ACCOUNT()
            if (resp) {
                toast('User logged out successfully')
                navigate('/auth/signin')
            }
        })
    }

    // Check if a link is active
    function isActive(path) {
        return location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path))
    }

    // Handle clicks outside the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [profileRef])

    return (
        <div className='hidden md:flex flex-col items-stretch justify-between w-full max-w-[240px] min-h-dvh h-full p-4 border-r border-gray-200 bg-white/95 space-y-6'>
            <div className='space-y-4'>
                {/* Title */}
                <div className='border-b border-gray-200 pb-4'>
                    <h1 className='font-bold text-xl text-gray-500 flex items-center gap-2'>
                        Task Manager
                    </h1>
                </div>

                {/* Navigation */}
                <div className='space-y-2'>
                    <p className='text-xs font-medium text-gray-500 uppercase tracking-wider px-2'>Navigation</p>
                    <nav className='flex flex-col space-y-1'>
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 p-2 rounded-lg transition-all text-sm ${isActive(item.path) ? 'bg-gray-50 text-gray-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    <Icon size={18} className={isActive(item.path) ? 'text-gray-600' : 'text-gray-500'} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Projects List */}
                <div className='space-y-2'>
                    <div className='flex items-center justify-between px-2'>
                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Projects</p>
                        <button className='text-gray-500 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors'>
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        {user?.projects?.map((project) => (
                            <Link
                                key={project.$id}
                                to={`/projects/${project.$id}`}
                                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-sm ${isActive(`/projects/${project.$id}`) ? 'bg-gray-50 text-gray-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                <Folder size={18} className={isActive(`/projects/${project.$id}`) ? 'text-gray-600' : 'text-gray-500'} />
                                {project.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 w-full'>
                <div
                    className='flex items-center gap-3 rounded-lg cursor-pointer relative'
                >
                    <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium'>
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className='text-sm'>
                        <p className='font-medium'>
                            {user?.name || 'User'}
                        </p>
                        <p className='text-xs text-gray-500'>
                            {user?.occupation || 'Member'}
                        </p>
                    </div>
                </div>

                <Button
                    className='w-full py-3 text-sm justify-between'
                    type='button'
                    onClick={handleSubmit}
                    isLoading={isPendingLogout}
                >
                    Logout
                    <LogOutIcon size={18} />
                </Button>
            </div>
        </div>
    )
}

// Main Sidebar Component that switches between mobile and desktop
export default function Sidebar({ isOpen, setIsOpen }) {
    return (
        <>
            <DesktopSidebar />
            <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}