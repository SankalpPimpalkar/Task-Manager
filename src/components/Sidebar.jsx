import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarClock, CirclePlus, LogOut, UserRound, ClipboardList, Folder } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modal.slice';
import { LOGOUT_ACCOUNT } from '../appwrite/auth';
import { logoutUser } from '../redux/slices/auth.slice';

export default function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const isLoading = useSelector(state => state.auth.isLoading)
    const tasksCount = useSelector(state => state.task.count)

    // Navigation items data
    const navItems = [
        {
            path: "/",
            icon: CalendarClock,
            label: "All Tasks",
            count: tasksCount,
            iconColor: "text-white",
            countColor: "bg-white/10 text-white",
            activeBg: "bg-[#1d1f29]"
        },
        {
            path: "/assigned",
            icon: ClipboardList,
            label: "Assigned",
            count: user?.assigned_tasks.length,
            iconColor: "text-purple-400",
            countColor: "bg-purple-500/10 text-purple-400",
            activeBg: "bg-purple-500/10"
        },
        {
            path: "/projects",
            icon: Folder,
            label: "Projects",
            count: user?.projects?.length,
            iconColor: "text-cyan-400",
            countColor: "bg-cyan-500/10 text-cyan-400",
            activeBg: "bg-cyan-500/10"
        },
        {
            path: "/profile",
            icon: UserRound,
            label: "Profile",
            iconColor: "text-blue-400",
            activeBg: "bg-blue-500/10"
        }
    ];

    const handleOpenCreateTaskModal = () => {
        dispatch(openModal('createTaskModal'));
    };

    const handleOpenAddNewModal = () => {
        dispatch(openModal('addNewMemberModal'));
    };

    const handleLogout = async () => {
        await LOGOUT_ACCOUNT();
        dispatch(logoutUser());
        navigate('/auth/register');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden md:flex border border-[#1d1f29] bg-[#11131e] p-5 col-span-1 rounded-md flex-col justify-between h-fit'>
                {/* Profile Section */}
                <div className="border-b border-[#1d1f29] pb-6 flex flex-col items-start gap-3">
                    {isLoading ? (
                        <>
                            <div className="w-12 h-12 rounded-full bg-[#1d1f29] animate-pulse" />
                            <div className="space-y-2 w-full">
                                <div className="h-4 w-24 bg-[#1d1f29] rounded animate-pulse" />
                                <div className="h-3 w-16 bg-[#1d1f29] rounded animate-pulse" />
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                className='rounded-full w-12 h-12 object-cover border-2 border-[#3a3d4d]'
                                src={user?.avatar || "https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png"}
                                alt="avatar"
                            />
                            <div>
                                <h1 className='text-white font-semibold'>{user?.name}</h1>
                                <p className='text-[#8a8d9b] text-sm'>@{user?.username}</p>
                            </div>
                        </>
                    )}
                </div>


                {/* Navigation Links */}
                <div className="flex-1 py-8">
                    <ul className='space-y-2'>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <li key={index} className="h-10 bg-[#1d1f29] rounded animate-pulse" />
                            ))
                        ) : (
                            <>
                                <li>
                                    <button
                                        onClick={handleOpenCreateTaskModal}
                                        className='flex items-center w-full px-4 py-3 gap-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors duration-200 cursor-pointer'
                                    >
                                        <CirclePlus className='w-5 h-5' />
                                        <span>Create Task</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleOpenAddNewModal}
                                        className='flex items-center w-full px-4 py-3 gap-3 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors duration-200 cursor-pointer'
                                    >
                                        <CirclePlus className='w-5 h-5' />
                                        <span>Add Member</span>
                                    </button>
                                </li>
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center px-4 py-3 rounded-lg text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white transition-colors duration-200 group ${isActive(item.path) ? `${item.activeBg} text-white` : ''
                                                }`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : item.iconColor
                                                    } group-hover:${item.iconColor.replace('400', '300') || 'text-white'}`} />
                                                <span>{item.label}</span>
                                            </div>
                                            <span className={`ml-auto ${isActive(item.path) ? 'bg-white/20 text-white' : item.countColor
                                                } text-xs px-2 py-1 rounded-full`}>
                                                {item.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>

                {/* Logout Button */}
                <button onClick={handleLogout} className='flex items-center justify-center w-full py-3 px-4 rounded-lg border border-[#1d1f29] text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white transition-colors duration-200 group cursor-pointer'>
                    <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-300" />
                    <span>Logout</span>
                </button>
            </div>

            {/* Mobile Bottom Bar */}
            <div className='md:hidden fixed bottom-0 left-0 right-0 border-t border-[#1d1f29] bg-[#11131e] z-50'>
                <ul className='flex justify-around px-4'>
                    {/* Add Task Button */}
                    <li className='flex-1'>
                        <button
                            onClick={handleOpenCreateTaskModal}
                            className='flex flex-col items-center py-3 text-emerald-400 hover:text-emerald-300 transition-colors duration-200'
                        >
                            <CirclePlus className='w-5 h-5 mb-1' />
                            <span className='text-xs text-white'>Add Task</span>
                        </button>
                    </li>

                    {/* Navigation Items */}
                    {navItems.map((item, index) => (
                        <li key={index} className='flex-1'>
                            <Link
                                to={item.path}
                                className={`flex flex-col items-center py-3 ${isActive(item.path) ? 'text-white' : 'text-[#d1d5db]'} hover:text-white transition-colors duration-200 group relative`}
                            >
                                <item.icon className={`w-5 h-5 mb-1 ${isActive(item.path) ? 'text-white' : item.iconColor} group-hover:${item.iconColor.replace('400', '300') || 'text-white'}`} />
                                <span className='text-xs'>{item.label}</span>
                                <span className={`absolute top-1 right-6 ${isActive(item.path) ? 'bg-white/20 text-white' : item.countColor} text-xs px-1.5 py-0.5 rounded-full`}>
                                    {item.count}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}