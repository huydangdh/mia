import React, { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useAuthorization } from "../usermanagement/UserAuthorization"; // Import the useAuthorization hook

const AttendanceApp = () => {
  const { userData } = useAuthorization(); // Get the current user data from useAuthorization hook
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [recordedData, setRecordedData] = useState<string[]>([]);

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    setClockInTime(currentTime);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    setClockOutTime(currentTime);
  };

  const handleReset = () => {
    setClockInTime(null);
    setClockOutTime(null);
  };

  const handleSaveData = () => {
    if (!userData || !userData.userId) {
      return; // Return if the current user data or employee ID is not available
    }
    const employeeId = userData.userId; // Get the employee ID from the current user data
    const dataRecord = `${employeeId}: ${clockInTime} - ${clockOutTime}`;
    setRecordedData((prevData) => [...prevData, dataRecord]);
    setClockInTime(null);
    setClockOutTime(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Attendance App</Card.Title>
              <Form.Group controlId="employeeId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  value={userData && userData.userId ? userData.userId : ""}
                  disabled // Disable the input field to prevent user input
                />
              </Form.Group>
              <Card.Text className="text-center">
                {clockInTime && <div>Clock In Time: {clockInTime}</div>}
                {clockOutTime && <div>Clock Out Time: {clockOutTime}</div>}
              </Card.Text>
              {!clockInTime && (
                <Button variant="primary" onClick={handleClockIn}>
                  Clock In
                </Button>
              )}
              {clockInTime && !clockOutTime && (
                <Button variant="success" onClick={handleClockOut}>
                  Clock Out
                </Button>
              )}
              {clockInTime && clockOutTime && (
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {clockInTime && clockOutTime && (
                <Button variant="info" onClick={handleSaveData}>
                  Save Data
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Recorded Data</Card.Title>
              {recordedData.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceApp;
