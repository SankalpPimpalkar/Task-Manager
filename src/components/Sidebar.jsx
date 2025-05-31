import React from 'react';
import { X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <div className="md:hidden">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-end">
                    <button onClick={onClose} className="text-2xl">
                        <X />
                    </button>
                </div>

                <div className="p-4 text-gray-700 h-[90vh] flex flex-col justify-between">
                    <div className='space-y-3'>
                        <h5 className='font-semibold'>
                            Menu
                        </h5>

                        <ul className='flex flex-col gap-2'>
                            <li className='border border-gray-300 bg-gray-50 px-4 py-2 rounded-md'>Home</li>
                            <li className='border border-gray-300 bg-gray-50 px-4 py-2 rounded-md'>Projects</li>
                            <li className='border border-gray-300 bg-gray-50 px-4 py-2 rounded-md'>Task board</li>
                            <li className='border border-gray-300 bg-gray-50 px-4 py-2 rounded-md'>Profile</li>
                        </ul>
                    </div>

                    <button className='w-full border border-red-300 bg-red-200 text-red-400 px-4 py-2 rounded-md'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
