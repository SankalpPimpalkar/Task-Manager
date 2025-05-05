import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, CalendarClock, CheckCircle2, CirclePlus, Clock, LogOut, UserRound } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    // Navigation items data
    const navItems = [
        {
            path: "/",
            icon: CalendarClock,
            label: "All Tasks",
            count: 3,
            iconColor: "text-white",
            countColor: "bg-white/10 text-white",
            activeBg: "bg-[#1d1f29]"
        },
        {
            path: "/important",
            icon: AlertCircle,
            label: "Important",
            count: 3,
            iconColor: "text-rose-400",
            countColor: "bg-rose-500/10 text-rose-400",
            activeBg: "bg-rose-500/10"
        },
        {
            path: "/completed",
            icon: CheckCircle2,
            label: "Completed",
            count: 12,
            iconColor: "text-emerald-400",
            countColor: "bg-emerald-500/10 text-emerald-400",
            activeBg: "bg-emerald-500/10"
        },
        {
            path: "/do-it-now",
            icon: Clock,
            label: "Do it now",
            count: 5,
            iconColor: "text-amber-400",
            countColor: "bg-amber-500/10 text-amber-400",
            activeBg: "bg-amber-500/10"
        },
        {
            path: "/profile",
            icon: UserRound,
            label: "Profile",
            iconColor: "text-blue-400",
            activeBg: "bg-blue-500/10"
        }
    ];

    // Check if current route matches
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Desktop Sidebar (hidden on mobile) */}
            <div className='hidden md:flex border border-[#1d1f29] bg-[#11131e] p-5 col-span-1 rounded-md flex-col justify-between h-fit'>
                {/* Profile Section */}
                <div className="border-b border-[#1d1f29] pb-6 flex flex-col items-start gap-3">
                    <img
                        className='rounded-full w-12 h-12 object-cover border-2 border-[#3a3d4d]'
                        src="https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png"
                        alt="avatar"
                    />
                    <div>
                        <h1 className='text-white font-semibold'>Sankalp Pimpalkar</h1>
                        <p className='text-[#8a8d9b] text-sm'>@Shanky</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-8">
                    <ul className='space-y-2'>
                        <li>
                            <button
                                className='flex items-center w-full px-4 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors duration-200 cursor-pointer'
                            >
                                <CirclePlus className='w-5 h-5 mr-3' />
                                <span>Create Task</span>
                            </button>
                        </li>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 rounded-lg text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white transition-colors duration-200 group ${
                                        isActive(item.path) ? `${item.activeBg} text-white` : ''
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 mr-3 ${
                                        isActive(item.path) ? 'text-white' : item.iconColor
                                    } group-hover:${item.iconColor.replace('400', '300') || 'text-white'}`} />
                                    <span>{item.label}</span>
                                    {item.count && (
                                        <span className={`ml-auto ${
                                            isActive(item.path) ? 'bg-white/20 text-white' : item.countColor
                                        } text-xs px-2 py-1 rounded-full`}>
                                            {item.count}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout Button */}
                <button className='flex items-center justify-center w-full py-3 px-4 rounded-lg border border-[#1d1f29] text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white transition-colors duration-200 group cursor-pointer'>
                    <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-300" />
                    <span>Logout</span>
                </button>
            </div>

            {/* Mobile Bottom Bar (shown on mobile) */}
            <div className='md:hidden fixed bottom-0 left-0 right-0 border-t border-[#1d1f29] bg-[#11131e] z-50'>
                <ul className='flex justify-around'>
                    {navItems.map((item, index) => (
                        <li key={index} className='flex-1'>
                            <Link
                                to={item.path}
                                className={`flex flex-col items-center py-3 ${
                                    isActive(item.path) ? 'text-white' : 'text-[#d1d5db]'
                                } hover:text-white transition-colors duration-200 group relative`}
                            >
                                <item.icon className={`w-5 h-5 mb-1 ${
                                    isActive(item.path) ? 'text-white' : item.iconColor
                                } group-hover:${item.iconColor.replace('400', '300') || 'text-white'}`} />
                                <span className='text-xs'>{item.label}</span>
                                {item.count && (
                                    <span className={`absolute top-1 right-6 ${
                                        isActive(item.path) ? 'bg-white/20 text-white' : item.countColor
                                    } text-xs px-1.5 py-0.5 rounded-full`}>
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}