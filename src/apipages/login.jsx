import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { userSignIn } from '../apis/login';


const Login = () => {
  const [loginData, setLoginData] = useState({
    emailOrMobile: '',
    password: '',
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger'); // For alert color change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignIn(loginData); // Call API for login
      if (response.error) {
        setMessage(response.error);
        setVariant('danger');
      } else {
        setMessage('Login successful!');
        setVariant('success');
        
        // Store token and login status
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', JSON.stringify(response.user));
        localStorage.setItem('isAuthenticated', true);
        setLoginData({
          emailOrMobile: "",
          password: ""
        });
        setTimeout(() => navigate('/'), 2000); // Redirect to dashboard after 2 seconds
      }
    } catch (err) {
      setMessage('Login failed. Please try again.', err);
      setVariant('danger');
    }
  };
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="shadow">
            <Card.Header className="bg-success text-white text-center">
              <h3>Login</h3>
            </Card.Header>
            <Card.Body>
              {message && <Alert variant={variant}>{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmailOrMobile" className="mb-3">
                  <Form.Label>Email or Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="emailOrMobile"
                    placeholder="Enter your email or mobile number"
                    value={loginData.emailOrMobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" type="submit" className="mt-3">
                    Login
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <span>Don&apos;t have an account? </span>
              <a href="/register" className="text-primary">Sign Up</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
