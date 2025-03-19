import { Button, Card, Col, Container, Row } from "react-bootstrap";
import FullScreenBackground from "../components/FullScreenBackground";

const Home = () => {
  return (
    <>
      <FullScreenBackground image={`${process.env.PUBLIC_URL}/home-bg.jpg`}>
        <Container fluid style={{ color: "white" }}>
          <Row className="h-100">
            <Col className="d-flex align-items-stretch justify-content-center">
              <Card
                className="d-flex"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <Card.Img
                  src={process.env.PUBLIC_URL + "/wateringcan.png"}
                  style={{ height: "30vh", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="text-center">
                    Watering Schedules
                  </Card.Title>
                  <Card.Text className="text-center">
                    Get email reminders about when your plants are due to be
                    watered!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex align-items-stretch justify-content-center">
              <Card
                className="d-flex"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <Card.Img
                  src={process.env.PUBLIC_URL + "/free.png"}
                  style={{ height: "30vh", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="text-center">100% FREE</Card.Title>
                  <Card.Text className="text-center">
                    This service is 100% free and always will be!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex align-items-stretch justify-content-center">
              <Card
                className="d-flex"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <Card.Img
                  src={process.env.PUBLIC_URL + "/greenhouse.png"}
                  style={{ height: "30vh", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="text-center">
                    Share your plants!
                  </Card.Title>
                  <Card.Text className="text-center">
                    Open the doors to your greenhouse and share your plants!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </FullScreenBackground>
    </>
  );
};

export default Home;
