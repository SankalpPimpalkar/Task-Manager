import { Users, Calendar, GitBranch, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import getRelativeTimeFromNow from '../helpers/getRelativeTimeFromNow'

export default function ProjectItem({ project }) {
    return (
        <Link
            to={`/projects/${project.$id}`}
            className="border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 hover:border-[#2a2d3a] transition-colors duration-200 block"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                    {project.title}
                </h3>
                <ArrowRight className="text-[#8a8d9b] w-5 h-5" />
            </div>

            <p className="text-[#b5b7ba] text-sm mb-6">
                {project.description}
            </p>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-xs text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    {project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}
                </div>

                <div className="flex items-center text-xs text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-full">
                    <GitBranch className="w-4 h-4 mr-2" />
                    {project.tasks.length} {project.tasks.length === 1 ? 'Task' : 'Tasks'}
                </div>
            </div>

            {/* Progress Section */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-[#8a8d9b] mb-2">
                    <span>Progress</span>
                    <span>
                        {Math.round(
                            (project.tasks.filter(t => t.status === 'Completed').length /
                                project.tasks.length) * 100 || 0
                        )}%
                    </span>
                </div>
                <div className="w-full bg-[#1d1f29] rounded-full h-1.5">
                    <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{
                            width: `${(project.tasks.filter(t => t.status === 'Completed').length /
                                project.tasks.length) * 100 || 0}%`
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-[#8a8d9b]">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created {getRelativeTimeFromNow(project.$createdAt)}
                </div>
                <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Last updated {getRelativeTimeFromNow(project.$updatedAt)}
                </div>
            </div>
        </Link>
    )
}