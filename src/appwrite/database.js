import { account, database } from "./config";
import appwriteConfig from "./config";
import { ID, Query } from "appwrite";

export async function GET_USER_BY_ID(id) {
    try {

        const user = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            id
        )

        console.log("SUCCESS | GET_USER_BY_ID: ", user)
        return user

    } catch (error) {
        console.log("ERROR | GET_USER_BY_ID: ", error.message)
        throw error
    }
}

export async function GET_USER_BY_NAME_OR_EMAIL_OR_USERNAME(keyword) {
    try {

        if (!keyword.trim()) {
            return []
        }

        const users = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.or(
                    [
                        Query.contains('name', keyword),
                        Query.contains('email', keyword),
                        Query.contains('username', keyword)
                    ]
                )
            ]
        )

        console.log("SUCCESS | GET_USER_BY_NAME_OR_EMAIL_OR_USERNAME: ", users)
        return users.documents

    } catch (error) {
        console.log("ERROR | GET_USER_BY_NAME_OR_EMAIL_OR_USERNAME: ", error.message)
        throw error
    }
}

export async function GET_ALL_TASKS() {
    try {

        const user = await account.get()

        const projects = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            [
                Query.contains('members_id', user.$id)
            ]
        );

        console.log("PROJECTS", projects)

        if (!projects.total) {
            return []
        }

        const projectIds = projects.documents.map(project => project.$id)

        const tasks = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            [
                Query.equal('project', projectIds)
            ]
        );


        if (tasks.total) {
            console.log("SUCCESS | GET_ALL_TASKS: ", tasks)
            return tasks.documents
        }

        throw "Failed to get all tasks"

    } catch (error) {
        console.log("ERROR | GET_ALL_TASKS: ", error.message)
        throw error
    }
}

export async function GET_ALL_ASSIGNED_TASKS() {
    try {

        const user = await account.get()

        const tasks = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            [
                Query.or([
                    Query.equal('assignee', user.$id),
                    Query.equal('assigned_by', user.$id)
                ])
            ]
        );


        if (tasks.total) {
            console.log("SUCCESS | GET_ALL_ASSIGNED_TASKS: ", tasks)
            return tasks.documents
        }

        throw "Failed to get assigned tasks"

    } catch (error) {
        console.log("ERROR | GET_ALL_ASSIGNED_TASKS: ", error.message)
        throw error
    }
}

export async function GET_ALL_TASKS_BY_PROJECT(projectId) {
    try {

        const tasks = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            [
                Query.equal('project', projectId)
            ]
        );

        if (tasks.total) {
            console.log("SUCCESS | GET_ALL_TASKS_BY_PROJECT: ", tasks)
            return tasks.documents
        }

        throw "Failed to get tasks by project"

    } catch (error) {
        console.log("ERROR | GET_ALL_TASKS_BY_PROJECT: ", error.message)
        throw error
    }
}

export async function GET_TASK_BY_ID(taskId) {
    try {

        const task = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            taskId
        )

        if (task) {
            console.log("SUCCESS | GET_TASK_BY_ID: ", task)
            return task
        }

        throw "Failed to get task"

    } catch (error) {
        console.log("ERROR | GET_TASK_BY_ID: ", error.message)
        throw error
    }
}

export async function GET_PROJECTS_BY_MEMBER() {
    try {

        const user = await account.get()

        const projects = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            [
                Query.contains('members_id', user.$id)
            ]
        )

        console.log("SUCCESS | GET_PROJECTS_BY_MEMBER: ", projects.documents)
        return projects.documents

    } catch (error) {
        console.log("ERROR | GET_PROJECTS_BY_MEMBER: ", error.message)
        throw error
    }
}

export async function GET_PROJECT_BY_ID(projectId) {
    try {

        const project = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            projectId
        )

        if (project) {
            console.log("SUCCESS | GET_PROJECT_BY_ID: ", project)
            return project
        }

        throw "Failed to get project"

    } catch (error) {
        console.log("ERROR | GET_PROJECT_BY_ID: ", error.message)
        throw error
    }
}

export async function CREATE_TASK({ title, description, priority, due_date, assignee, project }) {
    try {

        const user = await account.get()

        const task = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tasksCollectionId,
            ID.unique(),
            {
                title,
                description,
                priority,
                due_date,
                assigned_by: user.$id,
                assignee,
                project
            }
        )

        if (task) {
            console.log("SUCCESS | CREATE_TASK: ", task)
            return task
        }

        throw "Failed to create task"

    } catch (error) {
        console.log("ERROR | CREATE_TASK: ", error.message)
        throw error
    }
}

export async function CREATE_PROJECT({ title, description, deployment_links, source_code_links, members }) {
    try {

        const project = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            ID.unique(),
            {
                title,
                description,
                members,
                members_id: members,
                deployment_links,
                source_code_links
            }
        )

        if (project) {
            console.log("SUCCESS | CREATE_PROJECT: ", project)
            return project
        }

        throw "Failed to create project"

    } catch (error) {
        console.log("ERROR | CREATE_PROJECT: ", error.message)
        throw error
    }
}