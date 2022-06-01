import React, { useState } from 'react'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import Style from '../Login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IUserData } from '../Auth/types'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '../../components/providers/UseAuth'
import { users } from '../../components/user/UserItem'


const Login = () => {
  const { user, ga } = useAuth()
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData)
  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const ga = getAuth()
    if (isAuth) {
      try {
        await signInWithEmailAndPassword(ga, userData.email, userData.password)

        navigate(`/profile/${user?.id}`)
      } catch (error: any) {
        error.message && alert(error.message)
      }
    }


  }
  return (
    <div className={Style.form_wrapper}>
      <form onSubmit={handleLogin} className={Style.form} action=''>
        <div className={Style.form_name_flex}>
          <h2>Sign In</h2>

          <Link to={'/auth'} className={Style.linkBorder}>
            Register
          </Link>
        </div>

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
        <Button onClick={() => setIsAuth(true)}>Sign In</Button>

        {/* <div className={Style.bottom_flex}>
          <div  className={Style.checkboxFlex}>
          <label className={Style.customCheckbox}>
          <input className={Style.fakeCheckbox}  type="checkbox" />
          </label>
          <h3>Remember me</h3>
          </div>
          
          <a href="">Lost your password?</a>
        </div> */}
      </form>
    </div>
  )
}

export default Login
