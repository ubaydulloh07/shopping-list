import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/profile";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import PrivateRoute from "./PrivateRoute";
import Group from "../pages/Group/group";
import GroupDetails from "../pages/GroupDetails/GroupDetails";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Profile />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/group/:id" element={<GroupDetails />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}