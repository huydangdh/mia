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
import { useMMAuthentication } from "../usermanagement/useMMAuthentication";

import Clock from "react-clock";

const thresholdTime = "13:00 PM"; // Xác định thời gian ngưỡng muộn

const AttendanceApp = () => {
  const { userAuthInfo: userData } = useMMAuthentication();
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

  // Hiệu ứng và khởi tạo dữ liệu
  useEffect(() => {
    const savedData = localStorage.getItem("recordedData");
    if (savedData) {
      setRecordedData(JSON.parse(savedData));
    }
  }, []);

  // Lưu thời gian vào/ra làm trong local storage
  useEffect(() => {
    localStorage.setItem("clockInTime", clockInTime || "");
    localStorage.setItem("clockOutTime", clockOutTime || "");
  }, [clockInTime, clockOutTime]);

  // Lọc dữ liệu dựa trên truy vấn tìm kiếm
  useEffect(() => {
    const filtered = recordedData.filter((data) =>
      data.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [recordedData, searchQuery]);

  // Xử lý sự kiện khi bắt đầu làm việc
  const handleClockIn = () => {
    const actualCheckInTime = new Date();
    const thresholdTimeDate = new Date(`01/01/2000 ${thresholdTime}`);
    const actualCheckInTimeDate = new Date(`01/01/2000 ${actualCheckInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
    
    if (actualCheckInTimeDate > thresholdTimeDate) {
      alert("Bạn đã đến làm muộn!");
    } else {
      setClockInTime(actualCheckInTime.toLocaleString());
      setClockOutTime(null);
    }
  };

  // Xử lý sự kiện khi kết thúc làm việc
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleString();
    setClockOutTime(currentTime);
  };

  // Xử lý sự kiện đặt lại
  const handleReset = () => {
    setClockInTime(null);
    setClockOutTime(null);
  };

  // Xử lý sự kiện lưu dữ liệu
  const handleSaveData = async () => {
    if (!userData || !userData.data.user.id || !clockInTime || !clockOutTime) {
      return;
    }
    const employeeId = userData.data.user.id;
    const dataRecord = {
      employeeId,
      clockInTime,
      clockOutTime: clockOutTime || "Không có",
    };
    await simulateLoading(); // Giả lập tải trong 2 giây
    const newData = [...recordedData, dataRecord];
    setRecordedData(newData);
    localStorage.setItem("recordedData", JSON.stringify(newData));
    setClockInTime(null);
    setClockOutTime(null);
    setSearchQuery("");
  };

  // Giả lập tải
  const simulateLoading = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 2000); // Giả lập tải trong 2 giây
    });
  };

  // Cập nhật thời gian hiện tại
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
                <Clock value={currentTime} />
              </div>
              <Form.Group controlId="employeeId">
                <Form.Label>Mã nhân viên</Form.Label>
                <Form.Control
                  type="text"
                  value={userData && userData.data.user.id ? userData.data.user.id : ""}
                  disabled
                />
              </Form.Group>
              <Card.Text className="text-center">
                {clockInTime && (
                  <>
                    <div>
                      Bắt đầu làm việc: {clockInTime}
                    </div>
                  </>
                )}
                {clockOutTime && (
                  <>
                    <div>
                      Kết thúc làm việc: {clockOutTime}
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
                        <td>{data.clockInTime}</td>
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
