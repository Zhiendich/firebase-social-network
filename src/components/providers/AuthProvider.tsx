import { getAuth, onAuthStateChanged, Auth } from 'firebase/auth'
import { createContext, useEffect, useMemo, useState } from 'react'
import { IUser, TypeSetState } from '../../types'
import { users } from '../user/UserItem'
import { Firestore, getFirestore } from 'firebase/firestore'
interface IUserContext {
  user?: IUser | null
  setUser?: TypeSetState<IUser | null>
  ga?: Auth
  db?: Firestore
  children?: React.ReactNode
}
export const AuthContext = createContext<IUserContext>({} as IUserContext)

export const AuthProvider: React.FC<IUserContext> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const ga = getAuth()
  const db = getFirestore()
  useEffect(() => {
    const unListen = onAuthStateChanged(ga, authUser => {
      if (authUser)
        setUser(
          authUser
            ? {
                id: authUser.uid,
                avatar: users[1].avatar,
                name: authUser.displayName || ''
              }
            : null
        )
      else {
        setUser(null)
      }
    })
    return () => {
      unListen()
    }
  }, [])

  const values = useMemo(
    () => ({
      user,
      setUser,
      ga,
      db
    }),
    [user, ga, db]
  )
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
