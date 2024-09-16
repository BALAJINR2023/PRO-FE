import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { resetPassword } from '../apis/reset';


const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await resetPassword(token, newPassword);
        if (response.code === -1) {
            setMessage(response.msg);
            setVariant('danger');
        } else {
            setMessage('Password reset successfully. Redirecting to login...');
            setVariant('success');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Reset Password</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Reset Password
                </Button>
            </Form>
            {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
        </Container>
    );
};

export default ResetPassword;
