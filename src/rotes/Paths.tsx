
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../components/providers/UseAuth";
import Auth from "../pages/Auth/Auth";
import Friends from "../pages/Friends/Friends";
import Login from "../pages/Login/Login";
import Messages from "../pages/Messages/Messages";
import Posts from "../pages/posts/Posts";
import Profile from "../pages/Profile/Profile";
import { pathRoutes } from "./rotes";

const Paths: React.FC = () => {
    const { user } = useAuth()
    return (

        <Routes>
            {pathRoutes.map(path => {
                if (path.auth && user) {
                    return false
                }
                return <Route key={`key ${path.path}`} path={path.path}>{path.component}</Route>
            })
            }

            {/* <Route path="/auth" element={<Auth />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/friends/:id" element={<Friends />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/messages/:id" element={<Messages />} /> */}

        </Routes>

    )
}

export default Paths