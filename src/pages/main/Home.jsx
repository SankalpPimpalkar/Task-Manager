import { Link } from "react-router-dom";
import Project from "../../components/ui/Project";
import { useSelector } from "react-redux";

export default function Home() {

    const projects = useSelector(state => state.auth?.user?.projects)

    return (
        <div className="w-full h-full pb-2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-700">
                All Projects
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {projects?.map(project => (
                    <Project key={project.$id} project={project}/>
                ))}
            </div>
        </div>
    );
}