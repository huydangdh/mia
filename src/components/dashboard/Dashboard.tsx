import React, { useEffect, useState } from "react";
import AttendanceApp from "../attendance/AttendanceApp";
import IApp from "../common/IApp";
import { useAuthorization } from "../usermanagement/UserAuthorization";
import { Link } from "react-router-dom";
import { PERMISSION_CREATE_CLOCKRECORD, PERMISSION_READ_CLOCKRECORD } from "../../PermissionsUtil";

const appsData: IApp[] = [
  // Danh sách các ứng dụng trong hệ thống
  // Mỗi ứng dụng có một tên (name) và danh sách các quyền (permissions) mà người dùng cần có để truy cập vào ứng dụng đó
  {
    name: "ClockRecord",
    permissions: [
      PERMISSION_READ_CLOCKRECORD
    ],
    url: "/ClockRecord",
  },
  // ... Thêm các ứng dụng khác tương tự ...
];

const Dashboard = () => {
  const [appList, setAppList] = useState([]); // Giả định danh sách người dùng
  // Lấy danh sách các ứng dụng mà người dùng có quyền truy cập
  const { userData, getAppsByPermission } = useAuthorization();

  const userApps = getAppsByPermission(appsData, userData.permissions);

  useEffect(() => {
    // Giả định hàm gọi API để lấy danh sách ứng dụng từ hệ thống MES
    // Ví dụ: Gọi API appService.getAllApps()
    // appService.getAllApps().then((data) => setAppList(data));
    // Trong ví dụ này, chúng ta chỉ giả định dữ liệu danh sách ứng dụng đã được lấy từ API
    const dataFromAPI = [
      { id: 1, name: "App 1", description: "Description of App 1" },
      { id: 2, name: "App 2", description: "Description of App 2" },
      //...
    ];
    setAppList(dataFromAPI);
  }, []);
  return (
    <div>
      <p>Welcome, {userData.userId}!</p>
      <p>Your permissions: {userData.permissions.join(", ")}</p>
      {/* Danh sách các ứng dụng */}
      <h3>Your Apps:</h3>
      <ul>
        {userApps.map((app, index) => (
          <li key={index}>
            <Link to={app.url}>{app.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
