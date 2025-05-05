import { Flag, Archive, Clock, Tag, Share2, MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="text-[#8a8d9b] hover:text-white p-1 rounded hover:bg-[#1d1f29] cursor-pointer"
            >
                <MoreVertical size={18} />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md border border-[#2a2d3a] bg-[#1a1c27] shadow-lg focus:outline-none">
                    <div className="py-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white">
                            <Flag className="w-4 h-4 mr-3 text-amber-400" />
                            Set Priority
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white">
                            <Tag className="w-4 h-4 mr-3 text-blue-400" />
                            Add Label
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white">
                            <Clock className="w-4 h-4 mr-3 text-purple-400" />
                            Change Due Date
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white">
                            <Share2 className="w-4 h-4 mr-3 text-green-400" />
                            Share Task
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-[#d1d5db] hover:bg-[#1d1f29] hover:text-white">
                            <Archive className="w-4 h-4 mr-3 text-gray-400" />
                            Archive
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};