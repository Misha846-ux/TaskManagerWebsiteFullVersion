import { createBrowserRouter } from 'react-router-dom'
import Error404 from '../oldsrc/Errors/Error404'
import ForgotPassword from './app/Pages/LoginPage/Components/ForgotPassword'
import ProtectedRoute from './Protected_Router'
import LoginPage from './app/Pages/LoginPage/LoginPage'
import SingUp from './app/Pages/LoginPage/Components/SingUp'
import GlobalPage from './app/GlobalPage'
import MainPage from './app/Pages/MainPage/MainPage'
import ProjectPage from './app/Pages/ProjectPage/ProjectPage'
import LoginIn from './app/Pages/LoginPage/Components/LoginIn'
export const router = createBrowserRouter([
    {
        element:<ProtectedRoute/>,
        children: [
            {
            path: "/MainPage",
            element: <GlobalPage/>,
            children: [
                {
                    path: "MainContent/",
                    element: <MainPage/>
                },
                {
                path: "ProjectPage/:id",
                element: <ProjectPage/>,
                },
            ]
        }
    ]
    },
    {
        path: "/",
        element: <LoginPage/>,
        children:[
            {
                path: "/",
                element: <LoginIn/>
            },
            {
                path: "ForgotPassword",
                element: <ForgotPassword/>
            },
            {
                path: "SingUp",
                element: <SingUp/>
            }
        ]
    },
    {
        path: "*",
        element: <Error404/>
    } 
])
