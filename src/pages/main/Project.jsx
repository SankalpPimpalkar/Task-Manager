import React from 'react'
import { useParams } from 'react-router-dom'
import StatsCard from '../../components/StatsCard'
import { Ellipsis } from 'lucide-react'

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

export default function Project() {

    const params = useParams()

    return (
        <div className='pt-4 space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-600'>
                Web Redesign
            </h2>

            <p className='text-sm text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, vel! Saepe minus aut quia quasi sequi culpa natus quam eum! Aspernatur recusandae porro tempora, aut, deserunt harum veritatis beatae id quidem eligendi ullam accusantium, optio placeat. Voluptas repellendus, obcaecati laborum architecto tempora debitis nam omnis necessitatibus nostrum reiciendis vero voluptatum.
            </p>

            <div className='pt-4'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Tasks Overview
                </h4>

                <StatsCard />
            </div>

            <div className='pt-4 space-y-6'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Team
                </h4>

                <div class="overflow-x-auto border border-gray-200 rounded-md">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-400 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Avatar
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Occupation
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Joined At
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                demoMembers.map((member, id) => (
                                    <tr key={id} class="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                                            <img
                                                className='w-8 h-8'
                                                src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                                                alt=""
                                            />
                                        </td>
                                        <td class="px-6 py-4">
                                            {member.name}
                                        </td>
                                        <td class="px-6 py-4">
                                            {member.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {member.occupation}
                                        </td>
                                        <td class="px-6 py-4">
                                            {member.joinedAt}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button className='cursor-pointer'>
                                                <Ellipsis size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
