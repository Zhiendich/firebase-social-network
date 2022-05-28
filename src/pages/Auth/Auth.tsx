import React, { SyntheticEvent, useEffect, useState } from 'react'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import Style from '../Login/login.module.css'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { IUserData } from './types'
import { useAuth } from '../../components/providers/UseAuth'
import { useNavigate } from 'react-router-dom'

const Auth: React.FC = () => {
  const { ga, user } = useAuth()
  let navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    name: '',
    surname: '',
    email: '',
    password: ''
  } as IUserData)
  async function handleAuth(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const ga = getAuth()
    if (isAuth) {
      try {
        const res = await createUserWithEmailAndPassword(ga, userData.email, userData.password)
        await updateProfile(res.user, {
          displayName: `${userData.name}  ${userData.surname}`
        })
        console.log(res.user.displayName)
      } catch (error: any) {
        error.message && alert(error.message)
      }
    }
    console.log(userData.email, userData.password)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <div className={Style.form_wrapper}>
      <form onSubmit={handleAuth} className={Style.form} action=''>
        <div className={Style.form_name_flex}>
          <h2>Registration</h2>
        </div>
        <Input
          onChange={e => setUserData({ ...userData, name: e.target.value })}
          value={userData.name}
          type='text'
          placeholder='Name'
        />
        <Input
          onChange={e => setUserData({ ...userData, surname: e.target.value })}
          value={userData.surname}
          type='text'
          placeholder='Surname'
        />
        <Input
          onChange={e => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
          type='text'
          placeholder='Email'
        />
        <Input
          onChange={e => setUserData({ ...userData, password: e.target.value })}
          value={userData.password}
          type='password'
          placeholder='Password'
        />
        <Button onClick={() => setIsAuth(true)}>Register</Button>
      </form>
    </div>
  )
}

export default Auth
