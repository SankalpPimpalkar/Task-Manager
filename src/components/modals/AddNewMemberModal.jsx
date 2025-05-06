import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/slices/modal.slice'
import { X, Search } from 'lucide-react'

const allUsers = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Davis' },
    { id: 4, name: 'David Miller' },
]

const alreadyAddedIds = [2, 4]

export default function AddNewMemberModal() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleAdd = (user) => {
        console.log('Add user:', user)
        // dispatch(someReduxAction(user))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-70 p-4">
            <div className="border border-[#1d1f29] bg-[#11131e] rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => dispatch(closeModal('addNewMemberModal'))}
                    className="absolute top-4 right-4 text-[#8a8d9b] hover:text-white transition-colors cursor-pointer"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold text-white mb-6">Add New Member</h2>

                {/* Search Input with Icon */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-[#8a8d9b]" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                        placeholder="Search users..."
                    />
                </div>

                {/* Filtered User List */}
                <div className="space-y-2">
                    {filteredUsers.length === 0 ? (
                        <p className="text-sm text-[#8a8d9b]">No users found.</p>
                    ) : (
                        filteredUsers.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#1a1c27] border border-[#1d1f29]"
                            >
                                <span className="text-white">{user.name}</span>
                                {!alreadyAddedIds.includes(user.id) ? (
                                    <button
                                        onClick={() => handleAdd(user)}
                                        className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded cursor-pointer"
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <span className="text-xs text-[#8a8d9b]">Already a member</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
