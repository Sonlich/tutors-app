import {Route, Routes} from 'react-router-dom';
import DefaultLayout from "../components/layouts/default-layout";
import {HomePage} from "./home";
import {LoginPage} from "./login";
import {SignUpPage} from "./signup";
import {LessonsPage} from "./lessons";
import {ProfilePages} from "./profile";
import {SchedulePage} from "./schedule";

export const Pages = () => {
    return (
        <div>
            <DefaultLayout/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='signup' element={<SignUpPage/>}/>
                <Route path='lessons' element={<LessonsPage/>}/>
                <Route path='schedule' element={<SchedulePage/>}/>
                <Route path='profile/*' element={<ProfilePages/>}/>
                <Route path='*' element={<div>Not Found</div>}/>
            </Routes>
        </div>
    )
}