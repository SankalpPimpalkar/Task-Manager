import { account, database } from "./config";
import appwriteConfig from "./config";
import { ID } from "appwrite";

export async function CREATE_ACCOUNT(
    {
        name,
        email,
        password,
        username,
        occupation,
        location,
        about
    }
) {
    try {
        const authUser = await account.create(ID.unique(), email, password, name)

        if (authUser) {
            const dbUser = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                authUser.$id,
                {
                    name,
                    email,
                    username,
                    occupation,
                    location,
                    about,
                }
            )

            if (dbUser) {
                console.log("SUCCESS | CREATE ACCOUNT: ", dbUser)
                return await LOGIN_ACCOUNT({ email, password })
            }

            throw "Failed to create account in database"
        }

        throw "Failed to create account in auth"

    } catch (error) {
        console.log("ERROR | CREATE ACCOUNT: ", error.message)
        throw error
    }
}

export async function LOGIN_ACCOUNT(
    {
        email,
        password,
    }
) {
    try {
        const authUser = await account.createEmailPasswordSession(email, password)
        const user = await account.get()

        if (authUser) {
            const dbUser = await database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                user.$id
            )

            console.log(dbUser)

            if (dbUser) {
                console.log("SUCCESS | LOGIN ACCOUNT: ", dbUser)
                return dbUser
            }
        }

        throw "Failed to login user"

    } catch (error) {
        console.log("ERROR | LOGIN ACCOUNT: ", error.message)
        throw error
    }
}

export async function GET_ACCOUNT() {
    try {
        const authUser = await account.get()

        if (authUser) {
            const dbUser = await database.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                authUser.$id
            )

            if (dbUser) {
                console.log("SUCCESS | GET ACCOUNT: ", dbUser)
                return dbUser
            }
        }

        throw "Failed to get user details"

    } catch (error) {
        console.log("ERROR | GET ACCOUNT: ", error.message)
        throw error
    }
}

export async function LOGOUT_ACCOUNT() {
    try {

        await account.deleteSession('current')
        console.log("SUCCESS | LOGOUT ACCOUNT")
        return

    } catch (error) {
        console.log("ERROR | LOGOUT ACCOUNT: ", error.message)
        throw error
    }
}

export async function UPDATE_PASSWORD(
    {
        password,
        oldPassword
    }
) {
    try {

        const authUser = await account.updatePassword(password, oldPassword)

        if (authUser) {
            console.log("SUCCESS | PASSWORD UPDATED")
            return authUser
        }

        throw "Failed to update password"

    } catch (error) {
        console.log("ERROR | LOGOUT ACCOUNT: ", error.message)
        throw error
    }
}

export async function UPDATE_USER_INFO({ name, email, occupation, about, links, location }) {
    try {
        const authUser = await account.get();
        if (!authUser) throw new Error("No authenticated user");

        const existingUser = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            authUser.$id
        );

        const updatePayload = {};

        if (name?.trim() && name.trim() !== existingUser.name) updatePayload.name = name.trim();
        if (email?.trim() && email.trim() !== existingUser.email) updatePayload.email = email.trim();
        if (occupation?.trim() && occupation.trim() !== existingUser.occupation) updatePayload.occupation = occupation.trim();
        if (about?.trim() && about.trim() !== existingUser.about) updatePayload.about = about.trim();
        if (
            Array.isArray(links) &&
            links.length > 0 &&
            JSON.stringify(links) !== JSON.stringify(existingUser.links)
        ) {
            updatePayload.links = links;
        }
        if (location?.trim() && location.trim() !== existingUser.location) updatePayload.location = location.trim();

        if (Object.keys(updatePayload).length === 0) {
            throw new Error("No new valid fields to update");
        }

        const updatedUser = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            authUser.$id,
            updatePayload
        );

        return updatedUser;

    } catch (error) {
        console.error("ERROR | UPDATE_USER_INFO:", error.message);
        throw error;
    }
}

