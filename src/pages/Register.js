import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Register() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    const registerUser = (e) => {
        e.preventDefault();

        fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.message === 'Registered Successfully') {
                    // Save token or userId in localStorage
                    localStorage.setItem('token', data.token); // Save the token
                    localStorage.setItem('userId', data.userId); // Save userId
                    setUser({ id: data.userId, email }); // Update user context

                    // Clear form fields and navigate
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    notyf.success(data.message);
                    navigate('/');
                } else {
                    notyf.error('Registration failed. Please try again.');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                notyf.error('Something went wrong. Please try again');
            });
    };

    if (user && user.id) {
        return <Navigate to="/" />;
    }

    return (
        <Card className="justify-content-center mx-auto my-5" style={{ maxWidth: '600px' }}>
            <Card.Header>
                <h5 className="my-4 text-center">Register</h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={registerUser}>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isActive}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer>
                <p>Already have an account? Click here to <a href="/login">Login</a></p>
            </Card.Footer>
        </Card>
    );
}
