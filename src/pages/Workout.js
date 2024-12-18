import { useState, useEffect } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function MyWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDuration, setUpdatedDuration] = useState('');

    useEffect(() => {
        // Fetch user workouts
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.workouts) {
                    setWorkouts(data.workouts);
                } else {
                    setError('Failed to load workouts');
                }
            })
            .catch((error) => {
                console.error('Error fetching workouts:', error);
                setError('An error occurred while fetching workouts.');
            });
    }, []);

    // Handle the update of a workout
    const handleUpdate = (id) => {
        const updatedWorkoutData = {
            name: updatedName,
            duration: updatedDuration,
        };

        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedWorkoutData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWorkouts(workouts.map((workout) => (workout._id === id ? { ...workout, ...updatedWorkoutData } : workout)));
                    setIsUpdating(null);
                } else {
                    setError(data.message || 'Failed to update workout');
                }
            })
            .catch((error) => {
                console.error('Error updating workout:', error);
                setError('An error occurred while updating workout.');
            });
    };

    // Handle deleting a workout
    const handleDelete = (id) => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWorkouts(workouts.filter((workout) => workout._id !== id));
                } else {
                    setError(data.message || 'Failed to delete workout');
                }
            })
            .catch((error) => {
                console.error('Error deleting workout:', error);
                setError('An error occurred while deleting workout.');
            });
    };

    const handleComplete = (id) => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWorkouts(workouts.map((workout) => (workout._id === id ? { ...workout, status: 'Completed' } : workout)));
                } else {
                    setError(data.message || 'Failed to update workout status');
                }
            })
            .catch((error) => {
                console.error('Error completing workout:', error);
                setError('An error occurred while completing workout.');
            });
    };

    return (
        <Container>
            <h2 className="my-4">My Workouts</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <ListGroup>
                {workouts.map((workout) => (
                    <ListGroupItem key={workout._id}>
                        <h5>{workout.name}</h5>
                        <p>Duration: {workout.duration} minutes</p>
                        <p>Status: {workout.status || 'Not completed'}</p>
                        <div>
                            <Button variant="primary" onClick={() => handleComplete(workout._id)}>
                                Mark as Completed
                            </Button>
                            <Button variant="warning" onClick={() => {
                                setIsUpdating(workout._id);
                                setUpdatedName(workout.name);
                                setUpdatedDuration(workout.duration);
                            }} className="ms-2">
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(workout._id)} className="ms-2">
                                Delete
                            </Button>
                        </div>
                        {isUpdating === workout._id && (
                            <div className="mt-3">
                                <Form>
                                    <Form.Group controlId="updateWorkoutName">
                                        <Form.Label>Workout Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="updateWorkoutDuration" className="mt-2">
                                        <Form.Label>Duration (minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={updatedDuration}
                                            onChange={(e) => setUpdatedDuration(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" onClick={() => handleUpdate(workout._id)} className="mt-2">
                                        Update Workout
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}