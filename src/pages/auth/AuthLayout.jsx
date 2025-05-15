import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <div className="w-full min-h-dvh flex items-center justify-center sm:bg-gray-50">
            <Outlet/>
        </div>
    )
}
