import { Route, Routes } from "react-router-dom"
import Profile from "../pages/Profile/profile"
import Login from "../pages/Login/login"
import Register from "../pages/Register/register"

import PrivateRoute from "./PrivateRoute"

function Router() {
    return (
       <Routes>

        <Route path="/" element={<PrivateRoute />}>

        <Route path="/" element={<Profile />} />
        
        </Route>


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       </Routes>
    )
}

export default Router