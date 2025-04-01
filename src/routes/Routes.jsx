import { createBrowserRouter } from "react-router-dom";
import Layout from './../pages/Layout';
import Home from './../pages/Home';
import Login from './../auth/Login';
import Register from './../auth/Register';
import PageNotFound from './../pages/PageNotFound';
import ForgetPassword from "../auth/ForgetPassword";
import UserLayout from "../components/user/UserLayout";
import UserAccount from "../components/user/UserAccount";
import UpdatePicture from './../components/user/UpdatePicture';
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import DeleteAccount from "../components/user/DeleteAccount";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import AddAlbum from "../components/admin/AddAlbum";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"auth/Login",
                element:<Login/>
            },
            {
                path:"auth/Register",
                element:<Register/>
            },
            {
                path: "auth/ForgetPassword",
                element: <ForgetPassword/>
            },
            {
                path:"UserProfile",
                element: <UserLayout/>,
                children:[
                    {
                        index:true,
                        element: <UserAccount/>
                    },
                    {
                        path:"UpdatePicture",
                        element: <UpdatePicture/>
                    },
                    {
                        path: "UpdateProfile",
                        element: <UpdateProfile/>
                    },
                    {
                        path: "UpdatePassword",
                        element: <UpdatePassword/>
                    },
                    {
                        path:"DeleteAccount",
                        element: <DeleteAccount/>
                    }
                ]
            },
            {
                path:"admin",
                element:<AdminLayout/>,
                children: [
                    {
                        index:true,
                        element:<AdminDashboard/>
                    },
                    {
                        path: "AddAlbum",
                        element:<AddAlbum/>
                    }
                ]
            }
        ]
    },
    {
        path:"*",
        element: <PageNotFound/>
    }
])

export default routes