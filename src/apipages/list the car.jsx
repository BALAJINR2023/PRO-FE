import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { listCar } from '../apis/carhandleapis'; // Import the API function

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [carType, setCarType] = useState('');
  
  const navigate = useNavigate();
  const { state } = useLocation(); // Get state from navigate
  
  useEffect(() => {
    const loadCars = async () => {
      try {
        const carData = await listCar();
        setCars(carData);
        setFilteredCars(carData); // Initialize with all cars
      } catch (err) {
        setError('Failed to load cars. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Use the location passed from the previous component (LocationCalendar)
  useEffect(() => {
    if (state?.location) {
      setLocation(state.location); // Set the location based on passed state
    }
  }, [state]);

  // Filter cars based on location, fuel type, transmission type, and car type
  const filterCars = () => {
    const lowerCaseLocation = location.toLowerCase();
    const filtered = cars.filter(car => 
      car.location.toLowerCase().includes(lowerCaseLocation) &&
      (fuelType ? car.fuelType.toLowerCase() === fuelType.toLowerCase() : true) &&
      (transmissionType ? car.transmissionType.toLowerCase() === transmissionType.toLowerCase() : true) &&
      (carType ? car.carType.toLowerCase() === carType.toLowerCase() : true)
    );
    setFilteredCars(filtered);
  };

  // Handle filter button click
  const handleFilterClick = () => {
    filterCars();
  };

  const handleBookNow = (car) => {
    navigate('/booking', { state: { car } });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2>Car List</h2>

      {/* Sidebar for filters */}
      <Row>
        <Col md={3}>
          <div className="sidebar p-3">
            <h4>Filters</h4>

            {/* Location Filter */}
            <Form.Group controlId="locationFilter" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location} // Value comes from state
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            {/* Fuel Type Filter */}
            <Form.Group controlId="fuelTypeFilter" className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                as="select"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="">All</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </Form.Control>
            </Form.Group>

            {/* Transmission Type Filter */}
            <Form.Group controlId="transmissionTypeFilter" className="mb-3">
              <Form.Label>Transmission Type</Form.Label>
              <Form.Control
                as="select"
                value={transmissionType}
                onChange={(e) => setTransmissionType(e.target.value)}
              >
                <option value="">All</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </Form.Control>
            </Form.Group>

            {/* Car Type Filter */}
            <Form.Group controlId="carTypeFilter" className="mb-3">
              <Form.Label>Car Type</Form.Label>
              <Form.Control
                as="select"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="">All</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hatch">Hatch</option>
              </Form.Control>
            </Form.Group>

            {/* Button to filter car list */}
            <Button variant="primary" onClick={handleFilterClick}>
              Apply Filters
            </Button>
          </div>
        </Col>

        <Col md={9}>
          <Row>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <Col key={car._id} md={4} className="mb-4">
                  <Card>
                    {car.image && (
                      <Card.Img variant="top" src={`/${car.image}`} alt={car.name} />
                    )}
                    <Card.Body>
                      <Card.Title>{car.name}</Card.Title>
                      <Card.Text>
                        <strong>Model:</strong> {car.model}<br />
                        <strong>Price:</strong> ${car.price}<br />
                        <strong>Location:</strong> {car.location}<br />
                        <strong>Availability:</strong> {new Date(car.availability).toLocaleDateString()}<br />
                        <strong>Car Type:</strong> {car.carType}<br />
                        <strong>Fuel Type:</strong> {car.fuelType}<br />
                        <strong>Transmission:</strong> {car.transmissionType}<br />
                        <strong>Dealer Type:</strong> {car.dealerType}<br />
                        <strong>Year:</strong> {car.year}<br />
                      </Card.Text>
                      <Button variant="success" onClick={() => handleBookNow(car)}>
                        Book Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No cars match the selected filters.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CarList;
