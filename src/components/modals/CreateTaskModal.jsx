import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/slices/modal.slice'
import { X, Calendar, User } from 'lucide-react'

export default function CreateTaskModal() {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const task = {
            title: data.get('title'),
            description: data.get('description'),
            assignedTo: data.get('assignedTo'),
            deadline: data.get('deadline'),
            priority: data.get('priority')
        }
        console.log('Task submitted:', task)
        dispatch(closeModal('createTaskModal'))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-70 p-4">
            <div className="border border-[#1d1f29] bg-[#11131e] rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => dispatch(closeModal('createTaskModal'))}
                    className="absolute top-4 right-4 text-[#8a8d9b] hover:text-white transition-colors cursor-pointer"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-xl font-bold text-white mb-6">Create New Task</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Task Title */}
                    <div>
                        <label className="block text-sm font-medium text-[#d1d5db] mb-2">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                            placeholder="Enter task title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-[#d1d5db] mb-2">Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                            placeholder="Enter task description"
                        />
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label className="block text-sm font-medium text-[#d1d5db] mb-2">Assigned To</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="w-5 h-5 text-[#8a8d9b]" />
                            </div>
                            <input
                                type="text"
                                name="assignedTo"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                                placeholder="Assign team member"
                            />
                        </div>
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-[#d1d5db] mb-2">Deadline</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Calendar className="w-5 h-5 text-[#8a8d9b]" />
                            </div>
                            <input
                                type="date"
                                name="deadline"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-[#d1d5db] mb-2">Priority</label>
                        <select
                            name="priority"
                            className="w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 cursor-pointer"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    )
}