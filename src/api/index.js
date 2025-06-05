import { Client, Account, Databases, Storage, ID, Query } from "appwrite";
import appwriteConfig from "./config";

class APPWRITE {
    client;
    account;
    database;
    storage;

    constructor() {
        this.client = new Client()
        this.client
            .setEndpoint(appwriteConfig.endpoint)
            .setProject(appwriteConfig.projectId)

        this.account = new Account(this.client);
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async CREATE_ACCOUNT({ email, password, name, username, occupation }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                const userDB = await this.database.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    userAccount.$id,
                    {
                        name,
                        email,
                        username,
                        occupation
                    }
                )

                if (!userDB) {
                    console.log("FAILED TO CREATE ACCOUNT IN DB")
                    throw "FAILED TO CREATE ACCOUNT IN DB"
                }

                return this.LOGIN_ACCOUNT({ email, password })
            }

        } catch (error) {
            console.log("FAILED TO CREATE ACCOUNT", error)
            throw error;
        }
    }

    async LOGIN_ACCOUNT({ email, password }) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password)

            if (userAccount) {
                const user = await this.account.get()

                const userDB = await this.database.getDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    user.$id
                )

                return userDB
            }

            throw "FAILED TO LOGIN USER"

        } catch (error) {
            console.log("FAILED TO LOGIN USER", error)
            throw error;
        }
    }

    async GET_CURRENT_USER() {
        try {
            const user = await this.account.get()

            if (user) {
                const userDB = await this.database.getDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    user.$id
                )
                return userDB
            }

            throw "FAILED TO GET USER INFO"

        } catch (error) {
            console.log("FAILED TO GET USER INFO", error)
            return null
        }
    }

    async LOGOUT_ACCOUNT() {
        try {
            await this.account.deleteSessions()
            return true
        } catch (error) {
            console.log("FAILED TO LOGOUT USER", error)
            throw error;
        }
    }

    async CREATE_PROJECT({ name, description, members = [] }) {
        try {

            const user = await this.account.get()

            if (!name.trim() || !description.trim() || !members.length) {
                throw "All fields are required"
            }

            const newProject = await this.database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.projectsCollectionId,
                ID.unique(),
                {
                    name,
                    description,
                    owner: user.$id,
                    members: [...members, user.$id]
                }
            )

            return newProject;

        } catch (error) {
            console.log("FAILED TO CREATE PROJECT", error)
            throw error;
        }
    }

    async GET_PROJECTS() {
        try {

            const user = await this.account.get()

            const userInDB = await this.database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                user.$id,
            )

            return userInDB.projects

        } catch (error) {
            console.log("FAILED TO GET PROJECTS", error)
            throw error;
        }
    }

    async CREATE_TASK({ title, description, assigned_to, due_date, project }) {
        try {

            if (!title.trim() || !description.trim() || !assigned_to.trim() || !due_date.trim() || !project.trim()) {
                throw "All fields are required"
            }

            const user = await this.account.get()

            const newTask = await this.database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.tasksCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    assigned_to,
                    assigned_by: user.$id,
                    due_date,
                    project
                }
            )

            return newTask

        } catch (error) {
            console.log("FAILED TO CREATE TASK", error)
            throw error;
        }
    }

    async GET_ALL_TASKS() {
        try {

            const user = await this.account.get()

            const userInDB = await this.database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                user.$id,
            )

            const tasks = [...userInDB.tasks, ...userInDB.assigned_tasks]

            return tasks

        } catch (error) {
            console.log("FAILED TO GET ALL TASKS", error)
            throw error;
        }
    }

    async GET_TASK({ taskId }) {
        try {
            const task = await this.database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.tasksCollectionId,
                taskId
            )

            return task

        } catch (error) {
            console.log("FAILED TO GET TASK", error)
            throw error;
        }
    }

    async GET_PROJECT({ projectId }) {
        try {
            const project = await this.database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.projectsCollectionId,
                projectId
            )

            return project

        } catch (error) {
            console.log("FAILED TO GET PROJECT", error)
            throw error;
        }
    }

    async GET_TEAM({ projectId }) {
        try {

            if (!projectId.trim()) {
                return "Project Id required"
            }

            const team = await this.database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.projectsCollectionId,
                projectId
            )

            return team.members

        } catch (error) {
            console.log("FAILED TO GET TEAM", error)
            throw error;
        }
    }

    async GET_USERS_BY_QUERY({ q }) {
        try {

            if (!q.trim()) {
                throw "Query is required"
            }

            const users = await this.database.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                [
                    Query.or([
                        Query.contains('name', q),
                        Query.contains('username', q),
                        Query.contains('email', q),
                        Query.contains('occupation', q)
                    ])
                ]
            )

            return users.documents;

        } catch (error) {
            console.log("FAILED TO GET USERS", error)
            throw error;
        }
    }
}

const appwrite = new APPWRITE()
export default appwrite