import { twMerge } from "tailwind-merge"
import { LoaderCircle } from "lucide-react"

export default function Button({ children, isLoading, onClick, className = "", type = "submit", ...props }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={twMerge('flex gap-2 items-center w-fit bg-black text-white text-xs py-2 px-4 font-semibold rounded-md transition cursor-pointer disabled:bg-gray-500', className)}
            {...props}
        >
            {
                isLoading && <LoaderCircle className="animate-spin stroke-3" size={14} />
            }
            {children}
        </button>
    )
}
