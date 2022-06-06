import Auth from '../pages/Auth/Auth'
import Friends from '../pages/Friends/Friends'
import Login from '../pages/Login/Login'
import Messages from '../pages/Messages/Messages'
import Posts from '../pages/posts/Posts'
import Profile from '../pages/Profile/Profile'




export const pathRoutes = [
  { path: '/posts', component: Posts, auth: true },
  { path: `/profile/*`, component: Profile, auth: true },
  { path: `/friends/*`, component: Friends, auth: true },
  { path: `/messages/*`, component: Messages, auth: true },
  { path: '/login', component: Login, auth: false },
  { path: '/auth', component: Auth, auth: false }
]
