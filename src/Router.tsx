import React from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import MainContent from './Pages/PageContent/MainContent/MainContent'
import LoginMain from './Login/LoginMain'
import TaskPageContent from './TaskPageContent/TaskPageContent'
import Error404 from '../oldsrc/Errors/Error404'
import Project_Worked from '../oldsrc/Project_Worked/Project_Worked'
import getTasks from '../oldsrc/utilities/Methods/TasksMethods'
import ForgotPassword from './app/Pages/LoginPage/Components/ForgotPassword'
import ProtectedRoute from './Protected_Router'
import Members from '../oldsrc/Members/Members'
//npx json-server projectsDb.json
//npx json-server usersDb.json --port 3001
//npx json-server tasks-server.json --port 3002
export const router = createBrowserRouter([
    {
        element:<ProtectedRoute/>,
        children: [
            {
            path: "/MainPage",
            element: <MainPage />,
            children: [
                {
                    path: "MainContent/",
                    element: <MainContent/>,
                    children: [
                    {
                        path: "company/:companyId",
                        element: <Project_Worked/>,
                    },
                    {
                        path: "",
                        element: <Project_Worked/>,
                    },
                    {
                        path: ""
                    }
                    ]
                },
                {
                path: "TaskContent",
                element: <TaskPageContent/>,
                hydrateFallbackElement: <div>Loading...</div>,
                // loader: async () => {
                //     return await getTasks()
                // }
                },
                {
                path: "Members/:id",
                element: <Members/>
                }
            ]
        }
    ]
    },
    {
        path: "/",
        element: <LoginMain/>,
    },
    {
        path: "/ForgotPassword",
        element: <ForgotPassword/>
    },
    {
        path: "*",
        element: <Error404/>
    } 
])
