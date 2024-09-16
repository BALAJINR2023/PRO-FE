import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { forgotPassword } from '../apis/forgot.js';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(email);
        if (response.code === -1) {
            setMessage(response.msg);
            setVariant('danger');
        } else {
            setMessage('Reset password email sent successfully.');
            setVariant('success');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
            {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
        </Container>
    );
};

export default ForgotPassword;
