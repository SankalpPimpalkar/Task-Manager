import { LoaderCircle } from 'lucide-react'

export default function Default() {
    return (
        <div className="w-full min-h-dvh flex items-center justify-center">
            <LoaderCircle size={38} className="animate-spin text-gray-500" />
        </div>
    )
}
