import { Client, Account, Databases, Storage, ID } from "appwrite";
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
}

const appwrite = new APPWRITE()
export default appwrite