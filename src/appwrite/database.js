import { account, database } from "./config";
import appwriteConfig from "./config";
import { ID, Query } from "appwrite";

export async function GET_USER_BY_NAME_OR_EMAIL_OR_USERNAME(keyword) {
    try {

        if (!keyword.trim()) {
            return []
        }

        const users = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.contains('name', keyword),
                Query.contains('email', keyword),
                Query.contains('username', keyword)
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
            console.log("SUCCESS | GET_ALL_TASKS: ", tasks)
            return tasks.documents
        }

        throw "Failed to get tasks"

    } catch (error) {
        console.log("ERROR | GET_ALL_TASKS: ", error.message)
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