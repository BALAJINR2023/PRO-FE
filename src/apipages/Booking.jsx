import { useLocation } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';

const Booking = () => {
  const { state } = useLocation(); // Get car data from state
  const car = state ? state.car : null;

  const handlePayment = () => {
    // You can integrate with a payment gateway or a mock payment process here
    // After successful payment, confirm the booking and navigate to a success page
    alert('Payment Successful! Booking confirmed.');
    alert("Your booking has been successfully confirmed! Thank you for choosing our service.// Navigate to booking success page");
  };

  if (!car) {
    return <Alert variant="danger">No car selected for booking.</Alert>;
  }

  return (
    <div style={{ marginTop: "100px" }}>
    <Container >
      <h2>Booking Details</h2>
      <Card className="mb-4">
        {car.image && (
          <Card.Img variant="top" src={`/${car.image}`} alt={car.name} />
        )}
        <Card.Body>
          <Card.Title>{car.name}</Card.Title>
          <Card.Text>
            <strong>Model:</strong> {car.model}<br />
            <strong>Price:</strong> ${car.price}<br />
            <strong>Location:</strong> {car.location}<br />
            <strong>Car Type:</strong> {car.carType}<br />
            <strong>Fuel Type:</strong> {car.fuelType}<br />
            <strong>Transmission:</strong> {car.transmissionType}<br />
          </Card.Text>
          <Button variant="primary" onClick={handlePayment}>
            Proceed to Pay
          </Button>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default Booking;


