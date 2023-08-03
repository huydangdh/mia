import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useAuthorization } from "../usermanagement/UserAuthorization";
//import "./AttendanceApp.css"; // CSS file for animations

const AttendanceApp = () => {
  const { userData } = useAuthorization();
  const [clockInTime, setClockInTime] = useState<string | null>(localStorage.getItem("clockInTime"));
  const [clockOutTime, setClockOutTime] = useState<string | null>(localStorage.getItem("clockOutTime"));
  const [recordedData, setRecordedData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  useEffect(() => {
    // Load recorded data from local storage on component mount
    const savedData = localStorage.getItem("recordedData");
    if (savedData) {
      setRecordedData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save clockInTime and clockOutTime to local storage whenever they change
    localStorage.setItem("clockInTime", clockInTime || "");
    localStorage.setItem("clockOutTime", clockOutTime || "");
  }, [clockInTime, clockOutTime]);

  useEffect(() => {
    // Filter the recorded data based on the search query
    const filtered = recordedData.filter((data) =>
      data.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [recordedData, searchQuery]);

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleString();
    setClockInTime(currentTime);
    setClockOutTime(null);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleString();
    setClockOutTime(currentTime);
  };

  const handleReset = () => {
    setClockInTime(null);
    setClockOutTime(null);
  };

  const handleSaveData = () => {
    if (!userData || !userData.userId || !clockInTime || !clockOutTime) {
      return;
    }
    const employeeId = userData.userId;
    const dataRecord = `${employeeId}: ${clockInTime} - ${clockOutTime ? clockOutTime : "N/A"
      }`;
    setRecordedData((prevData) => [...prevData, dataRecord]);
    setClockInTime(null);
    setClockOutTime(null);
    setSearchQuery(""); // Reset search query
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Ứng dụng Chấm công</Card.Title>
              <Form.Group controlId="employeeId">
                <Form.Label>Mã nhân viên</Form.Label>
                <Form.Control
                  type="text"
                  value={userData && userData.userId ? userData.userId : ""}
                  disabled
                />
              </Form.Group>
              <Card.Text className="text-center">
                {clockInTime && (
                  <div>Bắt đầu làm việc: {new Date(clockInTime).toLocaleString()}</div>
                )}
                {clockOutTime && (
                  <div>Kết thúc làm việc: {new Date(clockOutTime).toLocaleString()}</div>
                )}
              </Card.Text>
              {!clockInTime && (
                <Button variant="primary" onClick={handleClockIn}>
                  Bắt đầu làm việc
                </Button>
              )}
              {clockInTime && !clockOutTime && (
                <Button variant="success" onClick={handleClockOut}>
                  Kết thúc làm việc
                </Button>
              )}
              {clockInTime && clockOutTime && (
                <>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button variant="info" onClick={handleSaveData}>
                    Lưu dữ liệu
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Dữ liệu đã ghi</Card.Title>
              <Form.Group controlId="searchQuery">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo Mã chấm công..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
              {filteredData.length === 0 ? (
                <div>Không tìm thấy dữ liệu phù hợp.</div>
              ) : (
                filteredData.map((data, index) => (
                  <div key={index}>{data}</div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceApp;
