import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { userSignIn } from '../apis/login';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger'); // For alert color change

  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const validationSchema = Yup.object().shape({
    emailOrMobile: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

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
              <Formik
                initialValues={{
                  emailOrMobile: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    const response = await userSignIn(values); // Call API for login
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

                      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
                    }
                  } catch (err) {
                    setMessage('Login failed. Please try again.', err);
                    setVariant('danger');
                  }
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmailOrMobile" className="mb-3">
                      <Form.Label>Email or Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="emailOrMobile"
                        placeholder="Enter your email or mobile number"
                        value={values.emailOrMobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="success" type="submit" className="mt-3">
                        Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

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
