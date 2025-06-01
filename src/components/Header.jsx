import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

export default function Header() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <header className='w-full border-b border-gray-300 sticky top-0 bg-white'>
            <div className='w-full p-3 max-w-6xl mx-auto flex items-center justify-between'>
                <Link to={'/'} className='font-bold text-lg text-gray-700'>
                    Task Manager
                </Link>

                <button className='md:hidden' onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={24} className='text-gray-700' />
                </button>

                <ul className='hidden md:flex items-center text-sm gap-6 text-gray-500'>
                    <Link to={'/'}>
                        Home
                    </Link>
                    <Link to={'/projects'}>
                        Projects
                    </Link>
                    <Link to={'/tasks'}>
                        Tasks
                    </Link>

                    <Link to={'/profile'}>
                        <img
                            className='w-10 h-10'
                            src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                            alt=""
                        />
                    </Link>
                </ul>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </header>
    )
}
