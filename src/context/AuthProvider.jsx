import { createContext, useState, useTransition } from "react";
import appwrite from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isloading: false,
    FetchUser: () => { },
    UpdateUser: () => { },
    RemoveUser: () => { },
})

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isPendingGetUserTransition, startGetUserTransition] = useTransition()
    const navigate = useNavigate()

    function FetchUser() {
        startGetUserTransition(async () => {
            const resp = await appwrite.GET_CURRENT_USER()

            if (resp) {
                setUser(resp)
                setIsAuthenticated(true)
                return
            }

            navigate('/auth/login')
        })
    }

    function UpdateUser(updatedUserInfo) {
        setUser({ ...user, ...updatedUserInfo })
        return
    }

    function RemoveUser() {
        setUser(null)
        setIsAuthenticated(false)
    }

    const values = {
        user,
        isAuthenticated,
        isloading: isPendingGetUserTransition,
        FetchUser,
        UpdateUser,
        RemoveUser
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}