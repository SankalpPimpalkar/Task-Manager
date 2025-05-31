import { Outlet } from "react-router-dom"

export default function Authlayout() {
    return (
        <div className="w-full min-h-dvh flex justify-center items-center">
            <Outlet />
        </div>
    )
}
