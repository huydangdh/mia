import { useEffect } from "react";
import IApp from "../common/IApp";
import { useMMAuthentication } from "../usermanagement/useMMAuthentication";
import { Link } from "react-router-dom";
import { EPermissions } from "../../PermissionsUtil";
import { Card, Col, Container, Row } from "react-bootstrap";
import SMTManagementContainer from "../../containers/SMTLineManagementContainer";

const appsData: IApp[] = [
  // Danh sách các ứng dụng trong hệ thống
  // Mỗi ứng dụng có một tên (name) và danh sách các quyền (permissions) mà người dùng cần có để truy cập vào ứng dụng đó
  {
    name: "ClockRecord",
    permissions: [EPermissions.VIEW_CLOCKRECORD],
    url: "/ClockRecord",
  },
  // ... Thêm các ứng dụng khác tương tự ...
];

const Dashboard = () => {
  // Lấy danh sách các ứng dụng mà người dùng có quyền truy cập
  const { userAuthInfo: userData, isLoading } = useMMAuthentication();

  const userApps = appsData;

  useEffect(() => {
    // Giả định hàm gọi API để lấy danh sách ứng dụng từ hệ thống MES
    // Ví dụ: Gọi API appService.getAllApps()
    // appService.getAllApps().then((data) => setAppList(data));
    // Trong ví dụ này, chúng ta chỉ giả định dữ liệu danh sách ứng dụng đã được lấy từ API

  }, []);
  if (isLoading) return (<>Loading ... </>)

  return (
    <>
      <Container className="mt-4">
        <h3>Xin chào, {userData.data.user.id}!</h3>
        <p>Quyền người dùng: {userData.data.user.permissions.join(", ")}</p>

        <Row>
          {userApps.map((app, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{app.name}</Card.Title>
                  <Card.Text>[[__Mô_tả_App__]]</Card.Text>
                  <Link to={app.url} className="btn btn-primary">
                    Chạy APP
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <SMTManagementContainer />
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
