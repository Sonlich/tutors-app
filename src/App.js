import {BrowserRouter} from "react-router-dom";
import {Pages} from "./pages";
// import {LoginForm} from "./components/forms/login-forms";
// import {RegistrationForm} from "./components/forms/signup-forms";
// import {TutorCard} from "./components/tutor-card";

function App() {

    return (
        <BrowserRouter>
            <Pages/>
        </BrowserRouter>
    );
}

export default App;
