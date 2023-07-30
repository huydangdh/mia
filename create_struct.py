import os

def create_folder_structure():
    structure = {
        'my-mes-system': {
            'public': {
                'index.html': ''
            },
            'src': {
                'assets': {
                    'images': '',
                    'styles': {
                        'main.scss': '',
                        'mixins.scss': '',
                        'variables.scss': ''
                    }
                },
                'components': {
                    'analytics': {
                        'DataAnalytics.js': '',
                        'ProductionReports.js': ''
                    },
                    'common': {
                        'Footer.js': '',
                        'Header.js': '',
                        'Sidebar.js': ''
                    },
                    'dashboard': {
                        'Dashboard.js': '',
                        'Widget.js': ''
                    },
                    'materialmanagement': {
                        'InventoryReconciliation.js': '',
                        'MaterialConsumption.js': '',
                        'MaterialInventory.js': '',
                        'MaterialIssuance.js': '',
                        'MaterialReceipts.js': '',
                        'MaterialRequisition.js': '',
                        'PurchaseManagement.js': '',
                        'SMTRouteManagement.js': '',
                        'StockAnalysis.js': '',
                        'StockManagement.js': ''
                    },
                    'notifications': {
                        'NotificationSystem.js': '',
                        'UserNotifications.js': ''
                    },
                    'orders': {
                        'OrderDetail.js': '',
                        'OrderList.js': ''
                    },
                    'production': {
                        'ProductionSchedule.js': '',
                        'ProductionStatus.js': ''
                    },
                    'quality': {
                        'DefectList.js': '',
                        'QualityDashboard.js': ''
                    },
                    'routecheck': {
                        'RouteCheck.js': '',
                        'RouteCheckHistory.js': '',
                        'RouteCheckLog.js': ''
                    },
                    'scanner': {
                        'ScanHistory.js': '',
                        'ScanLog.js': '',
                        'Scanner.js': ''
                    },
                    'settings': {
                        'SystemSettings.js': '',
                        'UserSettings.js': ''
                    },
                    'shopfloor': {
                        'ShopfloorControl.js': '',
                        'ShopfloorLogs.js': '',
                        'ShopfloorStatus.js': ''
                    },
                    'smtmanagement': {
                        'SMTLineManagement.js': '',
                        'SMTLineOptimization.js': '',
                        'SMTRouteManagement.js': ''
                    },
                    'usermanagement': {
                        'UserAuthentication.js': '',
                        'UserAuthorization.js': ''
                    }
                },
                'containers': {
                    'AssemblyStationContainer.js': '',
                    'CustomerSupportContainer.js': '',
                    'DashboardContainer.js': '',
                    'DataAnalyticsContainer.js': '',
                    'FinalInspectionContainer.js': '',
                    'FirmwareProgrammingContainer.js': '',
                    'InventoryReconciliationContainer.js': '',
                    'MaterialConsumptionContainer.js': '',
                    'MaterialInventoryContainer.js': '',
                    'MaterialIssuanceContainer.js': '',
                    'MaterialRequisitionContainer.js': '',
                    'MaterialReceiptsContainer.js': '',
                    'PackagingContainer.js': '',
                    'ProductionContainer.js': '',
                    'ProductionReportsContainer.js': '',
                    'PurchaseManagementContainer.js': '',
                    'QualityContainer.js': '',
                    'QualityControlContainer.js': '',
                    'RepairContainer.js': '',
                    'RouteCheckContainer.js': '',
                    'SMTLineManagementContainer.js': '',
                    'SMTLineOptimizationContainer.js': '',
                    'ScannerContainer.js': '',
                    'SettingsContainer.js': '',
                    'ShippingContainer.js': '',
                    'ShopfloorContainer.js': '',
                    'SMTRouteManagementContainer.js': '',
                    'TestingContainer.js': '',
                    'UserAuthenticationContainer.js': '',
                    'UserAuthorizationContainer.js': '',
                    'UserNotificationsContainer.js': ''
                },
                'services': {
                    'analyticsService.js': '',
                    'api.js': '',
                    'auth.js': '',
                    'integrationService.js': '',
                    'materialManagementService.js': '',
                    'notificationService.js': '',
                    'orderService.js': '',
                    'productionService.js': '',
                    'qualityService.js': '',
                    'routeCheckService.js': '',
                    'scannerService.js': '',
                    'shopfloorService.js': '',
                    'smtManagementService.js': '',
                    'userService.js': ''
                },
                'utils': {
                    'formatDate.js': '',
                    'helpers.js': ''
                },
                'App.js': '',
                'index.js': ''
            },
            '.gitignore': '',
            'package.json': '',
            'README.md': ''
        }
    }

    for folder, content in structure.items():
        create_folder(folder)
        if isinstance(content, dict):
            os.chdir(folder)
            create_folder_structure()
            os.chdir('..')
        else:
            for file_name, file_content in content.items():
                create_file(file_name, file_content)

def create_folder(folder):
    if not os.path.exists(folder):
        os.makedirs(folder)

def create_file(file_name, content):
    with open(file_name, 'w') as f:
        f.write(content)

if __name__ == '__main__':
    create_folder_structure()

