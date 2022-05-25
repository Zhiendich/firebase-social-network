import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { IUser, TypeSetState } from "../../types";
import { users } from "../user/UserItem";

interface IUserContext {
    user: IUser | null;
    setUser: TypeSetState<IUser | null>;
    ga: Auth;
    children?: React.ReactNode

}
export const AuthContext = createContext<IUserContext>({} as IUserContext)

export const AuthProvider: React.FC<IUserContext> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const ga = getAuth()
    useEffect(() => {
        const unListen = onAuthStateChanged(ga, authUser => {
            setUser(authUser ? {
                id: authUser.uid,
                avatar: users[1].avatar,
                name: authUser?.displayName || '',

            } : null)
        })
        return () => {
            unListen()
        }
    }, [])

    const values = useMemo(() => ({
        user,
        setUser,
        ga,
    }), [user, ga])
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}