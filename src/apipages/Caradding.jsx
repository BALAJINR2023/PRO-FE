import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { addCar } from '../apis/carhandleapis'; // Import the Axios function
import { useNavigate } from 'react-router-dom';

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
  const [year, setYear] = useState(new Date().getFullYear()); // Initialize with current year
  const [carImage, setCarImage] = useState(null); // Car Image state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Handle File Upload
  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a car object with the entered values
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
      carImage // Include the car image as a file
    };

    try {
      const result = await addCar(carData); // Send carData object using Axios
      if (result) {
        setMessage('Car added successfully!');
        setError('');
        navigate("/")
      }
    } catch (err) {
      setError(err.message || 'Error adding car. Please try again.');
      setMessage('');
    }
  };

  return (
    <div style={{ marginTop: '100px', marginBottom: '30px' }}>
      <Container className="mt-5">
        <h2>Add a New Car</h2>
        <Form onSubmit={handleSubmit}>
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

          <Form.Group controlId="formCarAvailability">
            <Form.Label>Availability</Form.Label>
            <Form.Control
              type="datetime-local"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCarType">
            <Form.Label>Car Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter car type (SUV, Sedan, Hatch)"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFuelType">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter fuel type (Petrol, Diesel, Electric)"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTransmissionType">
            <Form.Label>Transmission Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter transmission type (Automatic, Manual)"
              value={transmissionType}
              onChange={(e) => setTransmissionType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDealerType">
            <Form.Label>Dealer Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter dealer type (Individual, Private)"
              value={dealerType}
              onChange={(e) => setDealerType(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="formCarImage">
            <Form.Label>Car Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Add Car
          </Button>
        </Form>

        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Container>
    </div>
  );
};

export default AddCar;
