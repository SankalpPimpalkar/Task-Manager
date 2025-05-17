import { X, Link2, Code, Text, Type } from 'lucide-react'
import Button from '../../components/ui/Button'
import InputField from '../../components/ui/InputField'
import { useState, useTransition } from 'react'
import { CREATE_PROJECT } from '../../appwrite/database'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateProject({ onClose, isOpen }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        source_code_links: [],
        deployment_links: []
    })

    const [currentDeploymentLink, setCurrentDeploymentLink] = useState('')
    const [currentSourceCodeLink, setCurrentSourceCodeLink] = useState('')
    const [isPendingCreateProjectForm, startCreateProjectForm] = useTransition()
    const navigate = useNavigate()

    function handleClear() {
        setFormData({
            title: '',
            description: '',
            source_code_links: [],
            deployment_links: []
        })
        console.log("Cleared")
    }

    function handleSubmitCreateProject(event) {
        event.preventDefault()
        startCreateProjectForm(async () => {
            {
                const resp = await CREATE_PROJECT(formData)

                if (resp) {
                    onClose()
                    navigate(`/projects/${resp.$id}`)
                    toast.success(`Project ${resp.title} has been created`)
                }
            }
        })
    }

    function handleDeploymentLinkKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (currentDeploymentLink.trim()) {
                setFormData({
                    ...formData,
                    deployment_links: [...formData.deployment_links, currentDeploymentLink.trim()]
                })
                setCurrentDeploymentLink('')
            }
        }
    }

    function handleSourceCodeLinkKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (currentSourceCodeLink.trim()) {
                setFormData({
                    ...formData,
                    source_code_links: [...formData.source_code_links, currentSourceCodeLink.trim()]
                })
                setCurrentSourceCodeLink('')
            }
        }
    }

    function removeDeploymentLink(index) {
        setFormData({
            ...formData,
            deployment_links: formData.deployment_links.filter((_, i) => i !== index)
        })
    }

    function removeSourceCodeLink(index) {
        setFormData({
            ...formData,
            source_code_links: formData.source_code_links.filter((_, i) => i !== index)
        })
    }

    if (!isOpen) return null

    return (
        <div className='w-full h-full fixed top-0 left-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-full h-full max-w-lg relative md:h-fit md:max-h-[90vh] overflow-y-auto'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                >
                    <X size={20} />
                </button>

                <div className="space-y-1 mb-4">
                    <h1 className='font-bold text-lg'>Create New Project</h1>
                    <p className='text-xs text-gray-500'>
                        Fill in the details to create a new project.
                    </p>
                </div>

                <form onSubmit={handleSubmitCreateProject} className='space-y-4'>
                    {/* Title */}
                    <InputField
                        type='text'
                        id={'title'}
                        name={'title'}
                        label={'Title'}
                        placeholder={'Project Title'}
                        icon={Type}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    {/* Description */}
                    <InputField
                        type='text'
                        id={'description'}
                        name={'description'}
                        label={'Description'}
                        placeholder={'Write description'}
                        icon={Text}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    {/* Deployment Links */}
                    <div className="space-y-2">
                        <InputField
                            type='text'
                            id={'deployment_links'}
                            name={'deployment_links'}
                            label={'Deployment Links'}
                            placeholder={'Press Enter or Space to add link'}
                            icon={Link2}
                            required={false}
                            value={currentDeploymentLink}
                            onChange={(e) => setCurrentDeploymentLink(e.target.value)}
                            onKeyDown={handleDeploymentLinkKeyDown}
                        />
                        <div className='flex flex-wrap gap-2'>
                            {formData.deployment_links.map((link, index) => (
                                <span key={index} className='text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5'>
                                    {link.length > 20 ? `${link.substring(0, 20)}...` : link}
                                    <button
                                        type="button"
                                        onClick={() => removeDeploymentLink(index)}
                                        className='text-gray-400 hover:text-gray-600 transition-colors'
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Source Code Links */}
                    <div className="space-y-2">
                        <InputField
                            type='text'
                            id={'source_code_links'}
                            name={'source_code_links'}
                            label={'Source Code Links'}
                            required={false}
                            placeholder={'Press Enter or Space to add link'}
                            icon={Code}
                            value={currentSourceCodeLink}
                            onChange={(e) => setCurrentSourceCodeLink(e.target.value)}
                            onKeyDown={handleSourceCodeLinkKeyDown}
                        />
                        <div className='flex flex-wrap gap-2'>
                            {formData.source_code_links.map((link, index) => (
                                <span key={index} className='text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5'>
                                    {link.length > 20 ? `${link.substring(0, 20)}...` : link}
                                    <button
                                        type="button"
                                        onClick={() => removeSourceCodeLink(index)}
                                        className='text-gray-400 hover:text-gray-600 transition-colors'
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-row-reverse gap-3 pt-4'>
                        <Button isLoading={isPendingCreateProjectForm}>
                            Create Project
                        </Button>
                        <Button
                            type='button'
                            onClick={handleClear}
                            className='bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}