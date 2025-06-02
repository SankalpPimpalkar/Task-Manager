import { useState } from 'react'
import InputField from './InputField'
import { Search } from 'lucide-react'

const demoMembers = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        occupation: 'Frontend Engineer',
        joinedAt: '2024-02-15'
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        occupation: 'Backend Developer',
        joinedAt: '2023-11-20'
    },
    {
        name: 'Charlie Lee',
        email: 'charlie.lee@example.com',
        occupation: 'UI/UX Designer',
        joinedAt: '2025-01-10'
    },
    {
        name: 'Diana Ross',
        email: 'diana.ross@example.com',
        occupation: 'Project Manager',
        joinedAt: '2022-09-25'
    },
    {
        name: 'Ethan Ray',
        email: 'ethan.ray@example.com',
        occupation: 'QA Engineer',
        joinedAt: '2023-06-12'
    },
    {
        name: 'Fiona Green',
        email: 'fiona.green@example.com',
        occupation: 'DevOps Engineer',
        joinedAt: '2023-08-18'
    },
    {
        name: 'George Miller',
        email: 'george.miller@example.com',
        occupation: 'Security Analyst',
        joinedAt: '2022-12-01'
    },
    {
        name: 'Hannah Taylor',
        email: 'hannah.taylor@example.com',
        occupation: 'Business Analyst',
        joinedAt: '2024-04-07'
    },
    {
        name: 'Ian Clarke',
        email: 'ian.clarke@example.com',
        occupation: 'Mobile Developer',
        joinedAt: '2023-10-03'
    },
    {
        name: 'Julia White',
        email: 'julia.white@example.com',
        occupation: 'Scrum Master',
        joinedAt: '2022-07-14'
    }
]

function Step1() {
    return (
        <>
            <div className="col-span-1">
                <label className="block text-xs text-gray-500 font-medium">Title</label>
                <InputField
                    name={'title'}
                    placeholder={'Give a title for task'}
                    className={'text-sm'}
                />
            </div>

            <div className="col-span-1">
                <label htmlFor='due_date' className="block text-xs text-gray-500 font-medium  cursor-pointer">
                    Due Date
                </label>
                <InputField
                    type='date'
                    className={'text-gray-400 text-sm'}
                    placeholder={'Set a due date'}
                />
            </div>

            <div className="col-span-1 lg:col-span-2">
                <label className="block text-xs text-gray-500 font-medium">Description</label>
                <textarea
                    rows="8"
                    placeholder='Add description'
                    className="mt-1 w-full border border-gray-200 placeholder:text-gray-400 rounded p-3 focus:outline-1 focus:outline-blue-400 text-sm"
                />
            </div>
        </>
    )
}

function Step3({selectedMembers = [],toggleMemberSelection}) {
    return (
        <>
            <div className="col-span-2 border border-gray-200 flex items-center gap-1 px-4 py-0.5 rounded-md mb-4">
                <Search size={20} className='text-gray-400' />
                <InputField
                    name={'assigned_to'}
                    placeholder={'Assigned to'}
                    className={'text-sm border-none outline-none mt-0 px-0 py-0'}
                />
            </div>

            <div className="col-span-2 overflow-x-auto border border-gray-200 rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">Avatar</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3 hidden md:inline-block">Email</th>
                            <th className="px-4 py-3">Occupation</th>
                            <th className="px-4 py-3 hidden md:inline-block">Joined At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demoMembers.map((member) => (
                            <tr
                                key={member.id}
                                onClick={() => toggleMemberSelection(member.name)}
                                className={`border-b border-gray-200 cursor-pointer select-none ${
                                    selectedMembers.includes(member.name)
                                        ? 'bg-blue-50'
                                        : ''
                                }`}
                            >
                                <td className="px-4 py-3">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                                        alt=""
                                    />
                                </td>
                                <td className="px-4 py-3">{member.name}</td>
                                <td className="px-4 py-3 hidden md:inline-block">{member.email}</td>
                                <td className="px-4 py-3">{member.occupation}</td>
                                <td className="px-4 py-3 hidden md:inline-block">{member.joinedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function Step2({ selectedProject, setSelectedProject, projects }) {

    return (
        <>
            <div className="col-span-2 border border-gray-200 flex items-center gap-1 px-4 py-0.5 rounded-md mb-4">
                <Search size={20} className='text-gray-400' />
                <InputField
                    name={'project'}
                    placeholder={'Select Project'}
                    className={'text-sm border-none outline-none mt-0 px-0 py-0'}
                />
            </div>

            <div className='col-span-2'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                    {projects.map(project => (
                        <li
                            key={project.id}
                            onClick={() => setSelectedProject(project.id)}
                            className={`cursor-pointer border p-4 rounded-md space-y-2 transition-all
                                ${selectedProject === project.id
                                    ? 'border-none bg-blue-50 ring-1 ring-blue-300'
                                    : 'border-gray-300 bg-gray-50'}
                            `}
                        >
                            <h5 className='font-semibold text-gray-700'>{project.title}</h5>
                            <p className='text-gray-500 text-sm'>{project.description}</p>

                            <div className='w-full flex items-center justify-between'>
                                <p className='text-sm text-gray-600'>0/6</p>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((member) => (
                                        <img
                                            key={member}
                                            className="w-6 h-6 rounded-full border border-white"
                                            src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                                            alt="profile"
                                        />
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default function CreateTaskStepForm() {

    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [step, setStep] = useState(1)

    const toggleMemberSelection = (memberId) => {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(memberId)
                ? prevSelected.filter((id) => id !== memberId)
                : [...prevSelected, memberId]
        );
    };

    const projects = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Project ${i + 1}`,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, obcaecati.",
    }));

    function handleNext() {
        if (step < 3) {
            setStep(step + 1)
        }
    }

    function handlePrev() {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    return (
        <form className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
            {
                step == 1 && <Step1 />
            }
            {
                step == 2 && (
                    <Step2 selectedProject={selectedProject} setSelectedProject={setSelectedProject} projects={projects} />
                )
            }
            {
                step == 3 && <Step3 selectedMembers={selectedMembers} toggleMemberSelection={toggleMemberSelection} />
            }

            <div className='w-full col-span-2 flex items-center flex-row-reverse gap-2'>
                {
                    step != 3 ? (
                        <button type='button' onClick={handleNext} className='bg-blue-50 border border-blue-300 rounded-md text-blue-600 text-sm px-3 py-1.5 cursor-pointer'>
                            Next
                        </button>
                    ) : (
                        <button type='button' onClick={handleNext} className='bg-blue-50 border border-blue-300 rounded-md text-blue-600 text-sm px-3 py-1.5 cursor-pointer'>
                            Submit
                        </button>
                    )
                }

                <button type='button' onClick={handlePrev} className='bg-blue-50 border border-blue-300 rounded-md text-blue-600 text-sm px-3 py-1.5 cursor-pointer'>
                    Prev
                </button>
            </div>
        </form>
    )
}
