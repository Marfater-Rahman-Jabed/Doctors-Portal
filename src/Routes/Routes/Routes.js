import { createBrowserRouter } from "react-router-dom";
import Main from "../../LayOut/Main";
import Login from "../../Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Home from "../../Pages/Home/Home/Home";

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
            }, {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    }
])