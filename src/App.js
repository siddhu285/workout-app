import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar.js';
import { UserProvider } from './context/UserContext.js';
import 'notyf/notyf.min.css';

import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import AddWorkout from './pages/AddWorkout.js';
import Workout from './pages/Workout.js';
import Logout from './pages/Logout.js';

function App() {
    const [user, setUser] = useState({
        id: null,
    });

    function unsetUser() {
        localStorage.clear();
        setUser({
            id: null,
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token);

        if (!token) {
            setUser({
                id: null,
            });
            return;
        }

        setUser({
            id: 'dummyUserId',
        });
    }, []);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Container>
                    <Routes>
                        <Route path="/Register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/AddWorkout" element={<AddWorkout />} />
                        <Route path="/Workouts" element={<Workout />} />
                        <Route path="/Logout" element={<Logout />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;