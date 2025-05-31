export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLL_ID,
    tasksCollectionId: import.meta.env.VITE_APPWRITE_TASKS_COLL_ID,
    projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLL_ID,
    assetsBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ASSETS_ID,
};

export default appwriteConfig