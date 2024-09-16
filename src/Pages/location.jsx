/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LocationCalendar = ({ filterCars }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationError, setLocationError] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();
  const handleGetLocation = () => {
      
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          setLocationError("Unable to fetch location. Please allow location access in your browser settings.");
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationName = async (lat, lon) => {
    if (lat === null || lon === null) {
      setLocation('Unknown location');
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data && data.address) {
        const locationName = data.address.city || data.address.town || data.address.village || 'Unknown location';
        setLocation(locationName);
        
      } else {
        setLocation('Unknown location');
      }
    } catch (error) {
      console.error("Error fetching location name: ", error);
      setLocation('Unknown location');
    }
  };
  localStorage.setItem("city", location) 
  const handleFilter = () => {
    navigate('/listcar', { state: { location, startDate, endDate } });
    };

  return (
    <section className="location-calendar-new p-3">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="locationInput">
            <Form.Label>Pick a Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location or use your current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="outline-secondary" className="mt-2" onClick={handleGetLocation}>
              Use Current Location
            </Button>
            {locationError && <Alert variant="danger" className="mt-2">{locationError}</Alert>}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="startDateInput">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="endDateInput">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" onClick={handleFilter}>
        Get Cars
      </Button>
    </section>
  );
};

export default LocationCalendar;
