/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import { addCar, deleteCar, hostCar } from '../apis/carhandleapis'; // Import the necessary functions
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AddCar = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [carType, setCarType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [dealerType, setDealerType] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [carImage, setCarImage] = useState(null);
  const [seats, setSeats] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [carList, setCarList] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]);
  };
  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the JWT is stored in localStorage
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email); 
      const useremail=decodedToken.email;
      const cars = await hostCar(useremail);
      setCarList(cars);
    } catch (err) {
      setError(err.message || 'Error fetching cars. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      name,
      model,
      price,
      location,
      availability,
      carType,
      fuelType,
      transmissionType,
      dealerType,
      year,
      carImage,
      seats,
      email
    };

    try {
      const result = await addCar(carData);
      if (result) {
        setMessage('Car added successfully!');
        setError('');
        fetchCars(); // Refresh the car list
        navigate('/'); // Navigate to the home page after adding a car
      }
    } catch (err) {
      setError(err.message || 'Error adding car. Please try again.');
      setMessage('');
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const result = await deleteCar(carId);
        setMessage(result.message);
        fetchCars(); // Refresh the car list after deletion
        navigate('/')
      } catch (err) {
        setError(err.message || 'Error deleting car. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchCars(); // Fetch car list on component mount
  }, []);

  return (
    <div style={{ marginTop: '100px', marginBottom: '30px' }}>
      <Container className="mt-5">
        <h2>Add a New Car</h2>
        <Form onSubmit={handleSubmit}>
          {/* Other input fields remain unchanged */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCarName">
                <Form.Label>Car Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCarModel">
                <Form.Label>Car Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCarPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter car price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCarLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCarAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCarSeats">
                <Form.Label>Seat Count</Form.Label>
                <Form.Control
                  as="select"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  required
                >
                  <option value="">Select number of seats</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCarType">
                <Form.Label>Car Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter car type (SUV, Sedan, Hatch)"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFuelType">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter fuel type (Petrol, Diesel, Electric)"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formTransmissionType">
                <Form.Label>Transmission Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter transmission type (Automatic, Manual)"
                  value={transmissionType}
                  onChange={(e) => setTransmissionType(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDealerType">
                <Form.Label>Dealer Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter dealer type (Individual, Private)"
                  value={dealerType}
                  onChange={(e) => setDealerType(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCarYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter car year (e.g., 2024)"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCarImage">
                <Form.Label>Car Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-2">
            Add Car
          </Button>
        </Form>

        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        <h3 className="mt-5">Car List</h3>
        <ListGroup>
          {carList.map((car) => (
            <ListGroup.Item key={car._id} className="d-flex justify-content-between align-items-center">
              {`${car.name} (${car.model}) - ${car.seats} Seats`}
              <Button variant="danger" onClick={() => handleDelete(car._id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default AddCar;



















