import React, { createContext, useState, useEffect } from "react"
import { getCurrentUser } from "./services/index"
export const Context = createContext()

export default function OurProvider ({children}) {
    const [user, setuser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)

    async function getSession () {
        const {user} = await getCurrentUser()
                if (user?.username) {
                        loginUser(user)
                }
    }

    async function getupdatedUser(){
        const {user} = await getCurrentUser();
        setUserProfile(user)
    }
				
    useEffect(() => {
        getSession()
        getupdatedUser()
    }, [])

    function loginUser (user) {
        setuser(user)
    }

    function logout() {
        setuser(null)
    }

    return (
        <Context.Provider
        value={{
            user,
            loginUser,
            logout,
            userProfile,
        }}>
            {children}
        </Context.Provider>
        )
}