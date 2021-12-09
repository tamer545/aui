import App from "./App";
import Login from "./Login";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function RouterComponent() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}