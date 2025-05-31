import { LoaderCircle } from 'lucide-react'

export default function Button({ type = "button", loading = false, className = "", children, ...props }) {
    return (
        <button
            type={type}
            disabled={loading}
            className={`flex items-center gap-2 text-sm border px-4 py-2 rounded-md border-gray-200 bg-blue-500 cursor-pointer disabled:bg-blue-600 ${className}`}
            {...props}
        >
            {
                loading && (
                    <LoaderCircle size={18} className='animate-spin' />
                )
            }
            {children}
        </button>
    )
}
