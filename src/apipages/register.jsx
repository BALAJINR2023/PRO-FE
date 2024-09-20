import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { userSignup } from '../apis/Register';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    mobile: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    mobile: Yup.string().required('Required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await userSignup(values);
    setSubmitting(false);
    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage('Registration successful.');
      resetForm();
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="shadow">
            <Card.Header className="bg-success text-white text-center">
              <h3>Register</h3>
            </Card.Header>
            <Card.Body>
              {message && <Alert variant="info">{message}</Alert>}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formMobile" className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="success" type="submit" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Register'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="text-center">
              <span>Already have an account? </span>
              <a href="/login" className="text-primary">Login</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
