my-mes-system/
|-- public/
|   |-- index.html
|-- src/
|   |-- assets/
|   |   |-- images/
|   |   |-- styles/
|   |       |-- main.scss
|   |       |-- mixins.scss
|   |       |-- variables.scss
|   |-- components/
|   |   |-- analytics/
|   |   |   |-- DataAnalytics.js
|   |   |   |-- ProductionReports.js
|   |   |-- common/
|   |   |   |-- Footer.js
|   |   |   |-- Header.js
|   |   |   |-- Sidebar.js
|   |   |-- dashboard/
|   |   |   |-- Dashboard.js
|   |   |   |-- Widget.js
|   |   |-- materialmanagement/
|   |   |   |-- InventoryReconciliation.js
|   |   |   |-- MaterialConsumption.js
|   |   |   |-- MaterialInventory.js
|   |   |   |-- MaterialIssuance.js
|   |   |   |-- MaterialReceipts.js
|   |   |   |-- MaterialRequisition.js
|   |   |   |-- PurchaseManagement.js
|   |   |   |-- SMTRouteManagement.js
|   |   |   |-- StockAnalysis.js
|   |   |   |-- StockManagement.js
|   |   |-- notifications/
|   |   |   |-- NotificationSystem.js
|   |   |   |-- UserNotifications.js
|   |   |-- orders/
|   |   |   |-- OrderDetail.js
|   |   |   |-- OrderList.js
|   |   |-- production/
|   |   |   |-- ProductionSchedule.js
|   |   |   |-- ProductionStatus.js
|   |   |-- quality/
|   |   |   |-- DefectList.js
|   |   |   |-- QualityDashboard.js
|   |   |-- routecheck/
|   |   |   |-- RouteCheck.js
|   |   |   |-- RouteCheckHistory.js
|   |   |   |-- RouteCheckLog.js
|   |   |-- scanner/
|   |   |   |-- ScanHistory.js
|   |   |   |-- ScanLog.js
|   |   |   |-- Scanner.js
|   |   |-- settings/
|   |   |   |-- SystemSettings.js
|   |   |   |-- UserSettings.js
|   |   |-- shopfloor/
|   |   |   |-- ShopfloorControl.js
|   |   |   |-- ShopfloorLogs.js
|   |   |   |-- ShopfloorStatus.js
|   |   |-- smtmanagement/
|   |   |   |-- SMTLineManagement.js
|   |   |   |-- SMTLineOptimization.js
|   |   |   |-- SMTRouteManagement.js
|   |   |-- usermanagement/
|   |       |-- UserAuthentication.js
|   |       |-- UserAuthorization.js
|   |-- containers/
|   |   |-- AssemblyStationContainer.js
|   |   |-- CustomerSupportContainer.js
|   |   |-- DashboardContainer.js
|   |   |-- DataAnalyticsContainer.js
|   |   |-- FinalInspectionContainer.js
|   |   |-- FirmwareProgrammingContainer.js
|   |   |-- InventoryReconciliationContainer.js
|   |   |-- MaterialConsumptionContainer.js
|   |   |-- MaterialInventoryContainer.js
|   |   |-- MaterialIssuanceContainer.js
|   |   |-- MaterialRequisitionContainer.js
|   |   |-- MaterialReceiptsContainer.js
|   |   |-- PackagingContainer.js
|   |   |-- ProductionContainer.js
|   |   |-- ProductionReportsContainer.js
|   |   |-- PurchaseManagementContainer.js
|   |   |-- QualityContainer.js
|   |   |-- QualityControlContainer.js
|   |   |-- RepairContainer.js
|   |   |-- RouteCheckContainer.js
|   |   |-- SMTLineManagementContainer.js
|   |   |-- SMTLineOptimizationContainer.js
|   |   |-- ScannerContainer.js
|   |   |-- SettingsContainer.js
|   |   |-- ShippingContainer.js
|   |   |-- ShopfloorContainer.js
|   |   |-- SMTRouteManagementContainer.js
|   |   |-- TestingContainer.js
|   |   |-- UserAuthenticationContainer.js
|   |   |-- UserAuthorizationContainer.js
|   |   |-- UserNotificationsContainer.js
|   |-- services/
|   |   |-- analyticsService.js
|   |   |-- api.js
|   |   |-- auth.js
|   |   |-- integrationService.js
|   |   |-- materialManagementService.js
|   |   |-- notificationService.js
|   |   |-- orderService.js
|   |   |-- productionService.js
|   |   |-- qualityService.js
|   |   |-- routeCheckService.js
|   |   |-- scannerService.js
|   |   |-- shopfloorService.js
|   |   |-- smtManagementService.js
|   |   |-- userService.js
|   |-- utils/
|   |   |-- formatDate.js
|   |   |-- helpers.js
|   |-- App.js
|   |-- index.js
|-- .gitignore
|-- package.json
|-- README.md


-- Bảng Người dùng
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  full_name VARCHAR(100)
);

-- Bảng Vật liệu
CREATE TABLE materials (
  material_id SERIAL PRIMARY KEY,
  material_name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Bảng Đơn hàng sản xuất
CREATE TABLE production_orders (
  order_id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL
);

-- Bảng Lịch sản xuất
CREATE TABLE production_schedule (
  schedule_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES production_orders(order_id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL
);

-- Bảng Lỗi chất lượng
CREATE TABLE quality_defects (
  defect_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES production_orders(order_id) ON DELETE CASCADE,
  defect_type VARCHAR(100) NOT NULL,
  defect_description TEXT
);

-- Bảng Nhật ký Shopfloor
CREATE TABLE shopfloor_logs (
  log_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  log_time TIMESTAMP NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT
);

-- Bảng Di chuyển vật liệu
CREATE TABLE material_movement (
  movement_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  movement_type VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  movement_time TIMESTAMP NOT NULL
);

-- Bảng SMT Management
CREATE TABLE smt_lines (
  line_id SERIAL PRIMARY KEY,
  line_name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE smt_routes (
  route_id SERIAL PRIMARY KEY,
  route_name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE smt_line_optimization (
  optimization_id SERIAL PRIMARY KEY,
  line_id INTEGER REFERENCES smt_lines(line_id) ON DELETE CASCADE,
  optimization_data JSONB NOT NULL
);

-- Bảng Material Management
CREATE TABLE material_requisitions (
  requisition_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  requisition_time TIMESTAMP NOT NULL
);

CREATE TABLE material_inventory (
  inventory_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  last_updated TIMESTAMP NOT NULL
);

CREATE TABLE purchase_management (
  purchase_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  supplier_name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_date TIMESTAMP NOT NULL
);

CREATE TABLE material_receipts (
  receipt_id SERIAL PRIMARY KEY,
  purchase_id INTEGER REFERENCES purchase_management(purchase_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  receipt_date TIMESTAMP NOT NULL
);

CREATE TABLE material_issuance (
  issuance_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  issuance_date TIMESTAMP NOT NULL
);

CREATE TABLE stock_management (
  stock_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  last_updated TIMESTAMP NOT NULL
);

CREATE TABLE inventory_reconciliation (
  reconciliation_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  reconciliation_date TIMESTAMP NOT NULL
);

CREATE TABLE stock_analysis (
  analysis_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  analysis_data JSONB NOT NULL
);

CREATE TABLE material_consumption (
  consumption_id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  consumption_date TIMESTAMP NOT NULL
);

-- Bảng Analytics
CREATE TABLE data_analytics (
  analytics_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  analytics_data JSONB NOT NULL,
  analytics_time TIMESTAMP NOT NULL
);

CREATE TABLE production_reports (
  report_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  report_data JSONB NOT NULL,
  report_time TIMESTAMP NOT NULL
);

-- Bảng Notifications
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  notification_text TEXT NOT NULL,
  notification_time TIMESTAMP NOT NULL
);


-- Bảng trạng thái hiện tại sản phẩm
CREATE TABLE r_wip_tracking (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  current_status VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  work_center VARCHAR(50),
  user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL
);

-- Bảng chi tiết trạng thái hiện tại sản phẩm
CREATE TABLE r_wip_tracking_detail (
  id SERIAL PRIMARY KEY,
  wip_tracking_id INTEGER REFERENCES r_wip_tracking(id) ON DELETE CASCADE,
  status_description TEXT,
  update_time TIMESTAMP NOT NULL
);


-- Bảng lưu thông tin thiết lập lưu trình sản xuất
CREATE TABLE production_trace_setup (
  step_id SERIAL PRIMARY KEY,
  step_name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Bảng xác định mối quan hệ giữa các bước trong lưu trình
CREATE TABLE production_trace_relationship (
  relationship_id SERIAL PRIMARY KEY,
  from_step_id INTEGER REFERENCES production_trace_setup(step_id) ON DELETE CASCADE,
  to_step_id INTEGER REFERENCES production_trace_setup(step_id) ON DELETE CASCADE,
  condition_pass BOOLEAN NOT NULL,
  condition_description TEXT
);


-- Thêm dữ liệu vào bảng production_trace_setup
INSERT INTO production_trace_setup (step_name, description)
VALUES
  ('IQC inspection', 'Incoming Quality Control inspection'),
  ('ICT test', 'In-Circuit Test'),
  ('XRay', 'X-Ray inspection');

-- Thêm dữ liệu vào bảng production_trace_relationship
INSERT INTO production_trace_relationship (from_step_id, to_step_id, condition_pass, condition_description)
VALUES
  (1, 2, TRUE, 'Product passes IQC inspection and can proceed to ICT test'),
  (2, 3, TRUE, 'Product passes ICT test and can proceed to XRay inspection'),
  (3, 2, FALSE, 'Product fails XRay inspection and needs to go back to ICT test');

