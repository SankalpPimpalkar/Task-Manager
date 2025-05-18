import { Link } from "react-router-dom";
import Project from "../../components/ui/Project";
import { useSelector } from "react-redux";

const demoProjects = [
    {
        "title": "OPUS AI",
        "description": "A freelance startup project which focuses on mental health by using AI model",
        "members_id": [
            "681b6106003282cc4407"
        ],
        "demo_link": null,
        "source_code": null,
        "$id": "68287acc00171484449f",
        "$createdAt": "2025-05-17T12:02:20.592+00:00",
        "$updatedAt": "2025-05-17T12:02:20.592+00:00",
        "$permissions": [
            "read(\"user:681b6106003282cc4407\")",
            "update(\"user:681b6106003282cc4407\")",
            "delete(\"user:681b6106003282cc4407\")"
        ],
        "owner": {
            "name": "Sankalp Pimpalkar",
            "email": "sankalppimpalkar23@gmail.com",
            "username": "Shanky",
            "occupation": "Software Developer",
            "location": "Navi Mumbai Kharghar, India",
            "about": "I am a developer",
            "links": [
                "https://sankalp-pimpalkar-ahqz.vercel.app/",
                "https://www.linkedin.com/in/sankalp-pimpalkar-179bbb269/"
            ],
            "avatar": null,
            "$id": "681b6106003282cc4407",
            "$createdAt": "2025-05-07T13:32:56.179+00:00",
            "$updatedAt": "2025-05-17T12:30:12.082+00:00",
            "$permissions": [],
            "$databaseId": "681a65e9000af486f8ad",
            "$collectionId": "681a65f00017fd0a8377"
        },
        "tasks": [
            {
                "title": "Create AI Model",
                "description": "Create an AI model for backend integration",
                "priority": "urgent",
                "due_date": "2025-05-25T00:00:00.000+00:00",
                "status": "Pending",
                "$id": "6828f92f0003a8ed11e1",
                "$createdAt": "2025-05-17T21:01:35.312+00:00",
                "$updatedAt": "2025-05-17T21:01:35.312+00:00",
                "$permissions": [
                    "read(\"user:681b6106003282cc4407\")",
                    "update(\"user:681b6106003282cc4407\")",
                    "delete(\"user:681b6106003282cc4407\")"
                ],
                "$databaseId": "681a65e9000af486f8ad",
                "$collectionId": "681a65f50037232b4c22"
            }
        ],
        "$databaseId": "681a65e9000af486f8ad",
        "$collectionId": "681a66050016c7473bd3"
    },
    {
        "title": "OPUS BE",
        "description": "A backend for opus ai which integrates models and provide usable apis",
        "members_id": [
            "681b6106003282cc4407"
        ],
        "demo_link": null,
        "source_code": null,
        "$id": "68287c4c001e395ec30a",
        "$createdAt": "2025-05-17T12:08:44.708+00:00",
        "$updatedAt": "2025-05-17T12:08:44.708+00:00",
        "$permissions": [
            "read(\"user:681b6106003282cc4407\")",
            "update(\"user:681b6106003282cc4407\")",
            "delete(\"user:681b6106003282cc4407\")"
        ],
        "owner": {
            "name": "Sankalp Pimpalkar",
            "email": "sankalppimpalkar23@gmail.com",
            "username": "Shanky",
            "occupation": "Software Developer",
            "location": "Navi Mumbai Kharghar, India",
            "about": "I am a developer",
            "links": [
                "https://sankalp-pimpalkar-ahqz.vercel.app/",
                "https://www.linkedin.com/in/sankalp-pimpalkar-179bbb269/"
            ],
            "avatar": null,
            "$id": "681b6106003282cc4407",
            "$createdAt": "2025-05-07T13:32:56.179+00:00",
            "$updatedAt": "2025-05-17T12:30:12.082+00:00",
            "$permissions": [],
            "$databaseId": "681a65e9000af486f8ad",
            "$collectionId": "681a65f00017fd0a8377"
        },
        "tasks": [
            {
                "title": "Update generate Assessment API",
                "description": "integrate model generate API to backend",
                "priority": "high",
                "due_date": "2025-05-26T00:00:00.000+00:00",
                "status": "Pending",
                "$id": "6828fa0a00227aa5274c",
                "$createdAt": "2025-05-17T21:05:14.807+00:00",
                "$updatedAt": "2025-05-17T21:05:14.807+00:00",
                "$permissions": [
                    "read(\"user:681b6106003282cc4407\")",
                    "update(\"user:681b6106003282cc4407\")",
                    "delete(\"user:681b6106003282cc4407\")"
                ],
                "$databaseId": "681a65e9000af486f8ad",
                "$collectionId": "681a65f50037232b4c22"
            }
        ],
        "$databaseId": "681a65e9000af486f8ad",
        "$collectionId": "681a66050016c7473bd3"
    },
    {
        "title": "OPUS FE",
        "description": "Frontend for opus ai for interactivity ",
        "members_id": [
            "681b6106003282cc4407",
            "681c973f00243b2e85b3"
        ],
        "demo_link": "https://opus-prod.vercel.app/",
        "source_code": "https://gitlab.com/sonalkumari20/opus-fe",
        "$id": "68287c9b0033d3052d60",
        "$createdAt": "2025-05-17T12:10:04.056+00:00",
        "$updatedAt": "2025-05-18T13:26:34.083+00:00",
        "$permissions": [
            "read(\"user:681b6106003282cc4407\")",
            "update(\"user:681b6106003282cc4407\")",
            "delete(\"user:681b6106003282cc4407\")"
        ],
        "owner": {
            "name": "Sankalp Pimpalkar",
            "email": "sankalppimpalkar23@gmail.com",
            "username": "Shanky",
            "occupation": "Software Developer",
            "location": "Navi Mumbai Kharghar, India",
            "about": "I am a developer",
            "links": [
                "https://sankalp-pimpalkar-ahqz.vercel.app/",
                "https://www.linkedin.com/in/sankalp-pimpalkar-179bbb269/"
            ],
            "avatar": null,
            "$id": "681b6106003282cc4407",
            "$createdAt": "2025-05-07T13:32:56.179+00:00",
            "$updatedAt": "2025-05-17T12:30:12.082+00:00",
            "$permissions": [],
            "$databaseId": "681a65e9000af486f8ad",
            "$collectionId": "681a65f00017fd0a8377"
        },
        "tasks": [
            {
                "title": "New task",
                "description": "Complete this task",
                "priority": "low",
                "due_date": "2025-05-20T00:00:00.000+00:00",
                "status": "Pending",
                "$id": "6828f8ea001e14d6dd9d",
                "$createdAt": "2025-05-17T21:00:26.737+00:00",
                "$updatedAt": "2025-05-17T21:00:26.737+00:00",
                "$permissions": [
                    "read(\"user:681b6106003282cc4407\")",
                    "update(\"user:681b6106003282cc4407\")",
                    "delete(\"user:681b6106003282cc4407\")"
                ],
                "$databaseId": "681a65e9000af486f8ad",
                "$collectionId": "681a65f50037232b4c22"
            }
        ],
        "$databaseId": "681a65e9000af486f8ad",
        "$collectionId": "681a66050016c7473bd3"
    }
]


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