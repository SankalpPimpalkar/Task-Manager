import { Account, Client, Databases, Storage } from "appwrite";

const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    assetsBucketId: import.meta.env.VITE_APPWRITE_ASSETS_BUCKET_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLL_ID,
    tasksCollectionId: import.meta.env.VITE_APPWRITE_TASKS_COLL_ID,
    projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLL_ID,
};


const client = new Client()
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const database = new Databases(client)
export const assets = new Storage(client)
export default appwriteConfig;