import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

export default function AddWorkout() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any previous errors
        setError('');

        // Validate inputs
        if (!name || !duration) {
            setError('Please fill in both fields');
            return;
        }

        // Prepare the data to be sent
        const workoutData = {
            name: name,
            duration: duration,
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(workoutData),
            });

            if (response.ok) {
                // Redirect to the workouts page or show a success message
                alert('Workout added successfully');
                navigate('/workouts');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add workout');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container>
            <h2 className="my-4">Add Workout</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="workoutName">
                    <Form.Label>Workout Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="workoutDuration" className="mt-3">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter workout duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Add Workout
                </Button>
            </Form>
        </Container>
    );
}