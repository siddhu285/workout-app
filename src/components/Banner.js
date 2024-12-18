import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
    const { title, content, destination } = data;

    return (
        <Row className="justify-content-center my-5">
            <Col className='my-5'>
                <h1 className='display-4'>{title}</h1>
                <p>{content}</p>
                <Link to={destination}>Login to get Started
                </Link>
            </Col>
        </Row>

    )
}