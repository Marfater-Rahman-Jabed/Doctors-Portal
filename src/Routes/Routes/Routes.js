import { createBrowserRouter } from "react-router-dom";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import AllUser from "../../Dashboard/AllUser/AllUser";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import ManageDoctor from "../../Dashboard/ManageDoctor/ManageDoctor";
import Payment from "../../Dashboard/Payment/Payment";
import DashboardLayout from "../../LayOut/DashboardLayout";
import Main from "../../LayOut/Main";
import Login from "../../Login/Login";
import SignUp from "../../Login/SignUp";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Home from "../../Pages/Home/Home/Home";
import AdminRoute from "../AdminRoutes/AdminRoutes";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    }, {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/alluser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/managedoctor',
                element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-nu-nine.vercel.app/bookings/${params.id}`)
            },
        ]
    }
])