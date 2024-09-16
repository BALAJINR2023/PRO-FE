import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { updateUser } from '../apis/user';

const Profile = () => {
  const initialProfile = JSON.parse(localStorage.getItem("username"));

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(initialProfile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempProfile(profile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempProfile(profile);
  };

  const handleSave = async () => {
    try {
      const data = await updateUser(profile.email, tempProfile);
      localStorage.setItem("username", JSON.stringify(data.updatedUser));
      setProfile(data.updatedUser);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setEditMode(false);
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <Container fluid className="d-flex justify-content-center align-items-center max-vh-200 bg-light">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={12} lg={8}>
            <Card className="shadow p-3 mb-5 bg-white rounded">
              <Card.Header className="bg-primary text-white text-center">
                <FontAwesomeIcon icon={faUser} size="3x" className="mb-2" />
                <h4>Profile Information</h4>
              </Card.Header>
              <Card.Body>
                {!editMode ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <div>{profile.name}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <div>{profile.email}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile:</Form.Label>
                      <div>{profile.mobile}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender:</Form.Label>
                      <div>{profile.gender}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth:</Form.Label>
                      <div>{profile.dob ? (typeof profile.dob === 'string' ? profile.dob.slice(0, 10) : 'N/A') : 'N/A'}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location:</Form.Label>
                      <div>{profile.location}</div>
                    </Form.Group>
                    <Button variant="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                  </>
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={tempProfile.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={tempProfile.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile:</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={tempProfile.mobile}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender:</Form.Label>
                      <Form.Select
                        name="gender"
                        value={tempProfile.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth:</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={tempProfile.dob ? tempProfile.dob.slice(0, 10) : ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location:</Form.Label>
                      <Form.Select
                        name="location"
                        value={tempProfile.location}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Location</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </Form.Select>
                    </Form.Group>
                    <Button variant="success" onClick={handleSave} className="me-2">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
