import { Route, Routes } from 'react-router-dom'
import Authlayout from '../layouts/Authlayout'
import MainLayout from '../layouts/MainLayout'
import { Login, Register } from '../pages/auth'
import { Home } from '../pages/main'
import Projects from '../pages/main/Projects'
import TaskBoard from '../pages/main/TaskBoard'
import Tasks from '../pages/main/Tasks'
import Project from '../pages/main/Project'
import Profile from '../pages/main/Profile'

export default function Router() {
    return (
        <Routes>
            <Route path='/auth' element={<Authlayout />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>

            <Route path='/' element={<MainLayout />} >
                <Route path='' element={<Home />} />
                <Route path='tasks' element={<Tasks />} />
                <Route path='projects'>
                    <Route path='' element={<Projects />} />
                    <Route path=':projectId' element={<Project />} />
                    <Route path=':projectId/taskboard' element={<TaskBoard />} />
                </Route>
                <Route path='profile' element={<Profile />} />
            </Route>
        </Routes>
    )
}
