import { Link } from 'react-router-dom'
import { ExternalLink, Code, Link as LinkIcon } from "lucide-react";

function getInitial(name) {
    return name?.charAt(0).toUpperCase();
}

function MemberAvatar({ member }) {
    return (
        <div className="flex items-center">
            {member.avatar ? (
                <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-5 h-5 rounded-full mr-1"
                />
            ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-1">
                    <span className="text-xs font-medium text-gray-600">
                        {getInitial(member.name)}
                    </span>
                </div>
            )}
        </div>
    );
}

export default function Project({ project }) {

    return (
        <Link
            to={`/projects/${project.$id}`}
            key={project.$id}
            className="border border-gray-200 bg-white p-4 rounded-lg hover:border-gray-300 w-full max-h-48 flex flex-col items-start justify-between"
        >
            <div className='flex flex-col items-start justify-start w-full'>
                <div className="flex justify-between items-center mb-3 w-full">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {project.title}
                    </h2>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(project.$createdAt).toLocaleDateString()}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {project.description}
                </p>

                {project.members && project.members.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Team
                        </h3>
                        <div className="flex flex-wrap gap-1">
                            {project.members.map(member => (
                                <MemberAvatar key={member.$id} member={member} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                <div>
                    {project.demo_link ? (
                        <a
                            href={project.demo_link}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                            <ExternalLink className="w-3 h-3" />
                            <span>Demo</span>
                        </a>
                    ) : (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            <span>No demo</span>
                        </span>
                    )}
                </div>

                <div>
                    {project.source_code ? (
                        <a
                            href={project.source_code}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
                        >
                            <Code className="w-3 h-3" />
                            <span>Code</span>
                        </a>
                    ) : (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            <span>No code</span>
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}