import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { useAuthorization } from "../usermanagement/UserAuthorization";

import Clock from "react-clock";
import "react-clock/dist/Clock.css";

//import "./AttendanceApp.css"; // Tệp CSS cho các hiệu ứng
const thresholdTime = "05:00 AM"; // Define the threshold time for lateness

const AttendanceApp = () => {
  const { userData } = useAuthorization();
  const [clockInTime, setClockInTime] = useState<string | null>(
    localStorage.getItem("clockInTime")
  );
  const [clockOutTime, setClockOutTime] = useState<string | null>(
    localStorage.getItem("clockOutTime")
  );
  const [recordedData, setRecordedData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Nạp dữ liệu đã ghi từ bộ nhớ cục bộ khi thành phần được gắn vào
    const savedData = localStorage.getItem("recordedData");
    if (savedData) {
      setRecordedData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Lưu giờ vào/ra làm vào bộ nhớ cục bộ mỗi khi chúng thay đổi
    localStorage.setItem("clockInTime", clockInTime || "");
    localStorage.setItem("clockOutTime", clockOutTime || "");
  }, [clockInTime, clockOutTime]);

  useEffect(() => {
    // Lọc dữ liệu đã ghi dựa trên truy vấn tìm kiếm
    const filtered = recordedData.filter((data) =>
      data.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [recordedData, searchQuery]);

  const handleClockIn = () => {
    // Check if the user is late for work
    const actualCheckInTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const isLate = actualCheckInTime > thresholdTime;

    if (isLate) {
      alert("Bạn đã đến làm muộn!");
    } else {
      setClockInTime(actualCheckInTime);
      setClockOutTime(null);
    }
    /*
    const currentTime = new Date().toLocaleString();
    setClockInTime(currentTime);
    setClockOutTime(null);*/
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleString();
    setClockOutTime(currentTime);
  };

  const handleReset = () => {
    setClockInTime(null);
    setClockOutTime(null);
  };

  const handleSaveData = async () => {
    if (!userData || !userData.userId || !clockInTime || !clockOutTime) {
      return;
    }
    const employeeId = userData.userId;
    const dataRecord = {
      employeeId,
      clockInTime,
      clockOutTime: clockOutTime || "N/A",
    };
    await simulateLoading(); // Giả lập tải trong 2 giây
    const newData = [...recordedData, dataRecord];
    setRecordedData(newData);
    localStorage.setItem("recordedData", JSON.stringify(newData));
    setClockInTime(null);
    setClockOutTime(null);
    setSearchQuery("");
  };

  const simulateLoading = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000); // Giả lập tải trong 2 giây
    });
  };
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                Ứng dụng Chấm công
              </Card.Title>
              <div className="text-center">
                {" "}
                {/* Add a container for the clock */}
                <Clock value={currentTime} />
              </div>
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
                  <>
                    <div>
                      Bắt đầu làm việc: {new Date(clockInTime).toLocaleString()}
                    </div>
                  </>
                )}
                {clockOutTime && (
                  <>
                    <div>
                      Kết thúc làm việc:{" "}
                      {new Date(clockOutTime).toLocaleString()}
                    </div>
                  </>
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
                    Đặt lại
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
        <Col xs={12} sm={6} md={8}>
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
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã nhân viên</th>
                      <th>Thời gian bắt đầu</th>
                      <th>Thời gian kết thúc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.employeeId}</td>
                        <td>{new Date(data.clockInTime).toLocaleString()}</td>
                        <td>{data.clockOutTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceApp;
