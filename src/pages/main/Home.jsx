import { Link, useNavigate } from "react-router-dom";
import Project from "../../components/ui/Project";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";
import Button from "../../components/ui/Button";

export default function Home() {

    const projects = useSelector(state => state.auth?.user?.projects)
    const navigate = useNavigate()

    return (
        <div className="w-full h-full pb-2 space-y-4 p-2 sm:p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                    All Projects
                </h1>
                <Button
                    className="text-sm text-gray-200 p-2 sm:px-4 flex items-center gap-1"
                    onClick={() => navigate('/projects/create')}
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">New Project</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {projects?.map(project => (
                    <Project key={project.$id} project={project} />
                ))}
            </div>
        </div>
    );
}