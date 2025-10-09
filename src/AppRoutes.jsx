import React, { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

/* =========================================================
   Pages (lazy where it matters)
   ========================================================= */
const Home = lazy(() => import("./pages/home"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const About = lazy(() => import("./pages/about"));
const Login = lazy(() => import("./pages/auth/login"));

// const Register = lazy(() => import("./pages/placeholder"));
const ForgotPassword = lazy(() => import("./pages/auth/forgotPassword"));
const EmployeesList = lazy(() => import("./pages/employee"));
const EmployeeNew = lazy(() => import("./pages/employee/new"));
const EmployeeDetail = lazy(() => import("./pages/employee/detail"));
const EmployeeEdit = lazy(() => import("./pages/employee/edit"));
const EmployeeDrivers = lazy(() => import("./pages/employee/drivers"));
const EmployeeAssignments = lazy(() => import("./pages/employee/assignments"));

const DriversList = lazy(() => import("./pages/drivers/list"));
const DriverNew = lazy(() => import("./pages/drivers/new"));
const DriverDetail = lazy(() => import("./pages/drivers/detail"));
const DriverEdit = lazy(() => import("./pages/drivers/edit"));
const DriverTrips = lazy(() => import("./pages/drivers/trips"));
const DriverFuel = lazy(() => import("./pages/drivers/fuel"));

const ClientsList = lazy(() => import("./pages/clients"));
const ClientNew = lazy(() => import("./pages/clients/new"));
const ClientDetail = lazy(() => import("./pages/clients/detail"));

const OrdersList = lazy(() => import("./pages/orders"));
const OrderNew = lazy(() => import("./pages/order/new"));
const OrderDetail = lazy(() => import("./pages/order/detail"));


const DeliveriesList = lazy(() => import("./pages/deliveries"));
const DeliveryNew = lazy(() => import("./pages/deliveries/new"));
const DeliveriesBulkUpload = lazy(() => import("./pages/deliveries/bulk-upload"));
const DeliveryDetail = lazy(() => import("./pages/deliveries/detail"));
const DeliveryAssign = lazy(() => import("./pages/deliveries/assign"));
const DeliveryTrack = lazy(() => import("./pages/deliveries/track"));
const DeliveryAttachments = lazy(() => import("./pages/deliveries/attachments"));

const MyDeliveriesList = lazy(() => import("./pages/my-deliveries"));
const MyDeliveryDetail = lazy(() => import("./pages/my-deliveries/detail"));


const TripsList = lazy(() => import("./pages/trips"));
const TripNew = lazy(() => import("./pages/trips/new"));
const TripDetail = lazy(() => import("./pages/trips/detail"));
const TripAssign = lazy(() => import("./pages/trips/assign"));
const TripStops = lazy(() => import("./pages/trips/stops"));
const TripSummary = lazy(() => import("./pages/trips/summary"));
const TripPrint = lazy(() => import("./pages/trips/print"));

const MyTripToday = lazy(() => import("./pages/my-trip/today"));
const MyTripDetail = lazy(() => import("./pages/my-trip/detail"));

const VehiclesList = lazy(() => import("./pages/vehicles"));
const VehicleNew = lazy(() => import("./pages/vehicles/new")); // ✅ updated path
const VehicleDetail = lazy(() => import("./pages/vehicles/detail"));
const VehicleEdit = lazy(() => import("./pages/vehicles/edit"));
const VehicleFuel = lazy(() => import("./pages/vehicles/fuel"));
const VehicleMaintenance = lazy(() => import("./pages/vehicles/maintenance"));
const VehicleDocuments = lazy(() => import("./pages/vehicles/documents"));


const MyVehicle = lazy(() => import("./pages/my-vehicles"));


const FuelList = lazy(() => import("./pages/fuel"));
const FuelNew = lazy(() => import("./pages/fuel/new"));
const FuelDetail = lazy(() => import("./pages/fuel/detail"));

const ExpensesList = lazy(() => import("./pages/expenses"));
const ExpenseNew = lazy(() => import("./pages/expenses/new"));

const MaintenanceList = lazy(() => import("./pages/maintenance"));
const MaintenanceNew = lazy(() => import("./pages/maintenance/new"));


const HubsList = lazy(() => import("./pages/hubs"));
const HubsNew = lazy(() => import("./pages/hubs/new"));
const HubsDetail = lazy(() => import("./pages/hubs/detail"));


const ZonesList = lazy(() => import("./pages/zones"));
const ZoneNew = lazy(() => import("./pages/zones/new"));
const ZoneDetail = lazy(() => import("./pages/zones/detail"));

const RateCardsList = lazy(() => import("./pages/pricing/rate-cards"));
const RateCardNew = lazy(() => import("./pages/pricing/rate-cards/new"));
const RateCardDetail = lazy(() => import("./pages/rate-cards/detail"));

const ReportsIndex = lazy(() => import("./pages/reports"));
const ReportsDeliveries = lazy(() => import("./pages/reports/deliveries"));
const ReportsTrips = lazy(() => import("./pages/reports/trips"));
const ReportsFuel = lazy(() => import("./pages/reports/fuel"));
const ReportsVehicles = lazy(() => import("./pages/reports/vehicles"));
const ReportsFinance = lazy(() => import("./pages/reports/finance"));
const ReportsEmployeePerformance = lazy(() => import("./pages/reports/employee-performance"));


const AuditLog = lazy(() => import("./pages/audit-log"));

const PrintTripSheet = lazy(() => import("./pages/print/trip-sheet"));
const PrintDeliveryLabels = lazy(() => import("./pages/print/delivery-labels"));
const PrintVehicleLog = lazy(() => import("./pages/print/vehicle-log"));


const Notifications = lazy(() => import("./pages/placeholder"));
const Settings = lazy(() => import("./pages/placeholder"));
const SettingsProfile = lazy(() => import("./pages/placeholder"));
const SettingsCompany = lazy(() => import("./pages/placeholder"));
const SettingsRoles = lazy(() => import("./pages/placeholder"));
const SettingsNotifications = lazy(() => import("./pages/placeholder"));
const SettingsBackup = lazy(() => import("./pages/placeholder"));
const SettingsPreferences = lazy(() => import("./pages/placeholder"));
const Me = lazy(() => import("./pages/placeholder"));

const NotFound = lazy(() => import("./pages/placeholder"));

/* =========================================================
   Component
   ========================================================= */
const AppRoutes = () => {
    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        width: "100%",
                        height: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            <Routes>
                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Core */}
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About title="About" note="Project overview and notes" />} />

                {/* Auth */}
                <Route path="/auth/login" element={<Login title="Login" note="Role-based login (design-only for now)" />} />
                {/* <Route path="/auth/register" element={<Register title="Register" note="First-time admin signup" />} /> */}
                <Route path="/auth/forgot" element={<ForgotPassword title="Forgot Password" note="Password reset flow (design-only)" />} />

                {/* Dashboard (role-aware) */}
                <Route path="/dashboard" element={<Dashboard title="Dashboard" note="Widgets vary by role: Admin/Employee/Driver" />} />

                {/* People & Roles (Admin) */}
                <Route path="/admin/employees" element={<EmployeesList title="Employees" note="Manage employees" />} />
                <Route path="/admin/employees/new" element={<EmployeeNew title="New Employee" />} />
                <Route path="/admin/employees/:employeeId" element={<EmployeeDetail title="Employee Detail" />} />
                <Route path="/admin/employees/:employeeId/edit" element={<EmployeeEdit title="Edit Employee" />} />
                <Route path="/admin/employees/:employeeId/drivers" element={<EmployeeDrivers title="Employee → Drivers" />} />
                <Route path="/admin/employees/:employeeId/assignments" element={<EmployeeAssignments title="Employee → Assignments" />} />

                <Route path="/admin/drivers" element={<DriversList title="Drivers" note="Global drivers list" />} />
                <Route path="/admin/drivers/new" element={<DriverNew title="New Driver" />} />
                <Route path="/admin/drivers/:driverId" element={<DriverDetail title="Driver Detail" />} />
                <Route path="/admin/drivers/:driverId/edit" element={<DriverEdit title="Edit Driver" />} />
                <Route path="/admin/drivers/:driverId/trips" element={<DriverTrips title="Driver Trips" />} />
                <Route path="/admin/drivers/:driverId/fuel" element={<DriverFuel title="Driver Fuel Entries" />} />

                {/* Clients & Orders */}
                <Route path="/clients" element={<ClientsList title="Clients" />} />
                <Route path="/clients/new" element={<ClientNew title="New Client" />} />
                <Route path="/clients/:clientId" element={<ClientDetail title="Client Detail" />} />

                <Route path="/orders" element={<OrdersList title="Orders" />} />
                <Route path="/orders/new" element={<OrderNew title="New Order" />} />
                <Route path="/orders/:orderId" element={<OrderDetail title="Order Detail" />} />

                {/* Deliveries */}
                <Route path="/deliveries" element={<DeliveriesList title="Deliveries" note="All deliveries with filters" />} />
                <Route path="/deliveries/new" element={<DeliveryNew title="New Delivery" />} />
                <Route path="/deliveries/bulk-upload" element={<DeliveriesBulkUpload title="Bulk Upload Deliveries" />} />
                <Route path="/deliveries/:deliveryId" element={<DeliveryDetail title="Delivery Detail" />} />
                <Route path="/deliveries/:deliveryId/assign" element={<DeliveryAssign title="Assign Delivery" />} />
                <Route path="/deliveries/:deliveryId/track" element={<DeliveryTrack title="Delivery Tracking Timeline" />} />
                <Route path="/deliveries/:deliveryId/attachments" element={<DeliveryAttachments title="Delivery Attachments / POD" />} />

                {/* Driver-facing mirrors */}
                <Route path="/my/deliveries" element={<MyDeliveriesList title="My Deliveries (Driver)" />} />
                <Route path="/my/deliveries/:deliveryId" element={<MyDeliveryDetail title="My Delivery Detail (Driver)" />} />

                {/* Trips & Route Plans */}
                <Route path="/trips" element={<TripsList title="Trips" note="Plans, distance, capacity" />} />
                <Route path="/trips/new" element={<TripNew title="New Trip" />} />
                <Route path="/trips/:tripId" element={<TripDetail title="Trip Detail" />} />
                <Route path="/trips/:tripId/assign" element={<TripAssign title="Assign Driver & Vehicle" />} />
                <Route path="/trips/:tripId/stops" element={<TripStops title="Trip Stops" />} />
                <Route path="/trips/:tripId/summary" element={<TripSummary title="Trip Summary" />} />
                <Route path="/trips/:tripId/print" element={<TripPrint title="Trip Sheet (Print)" />} />

                {/* Driver-facing */}
                <Route path="/my/trip/today" element={<MyTripToday title="My Trip Today (Driver)" />} />
                <Route path="/my/trips/:tripId" element={<MyTripDetail title="My Trip Detail (Driver)" />} />

                {/* Vehicles & Assets */}
                <Route path="/assets/vehicles" element={<VehiclesList title="Vehicles" />} />
                <Route path="/assets/vehicles/new" element={<VehicleNew title="New Vehicle" />} />
                <Route path="/assets/vehicles/:vehicleId" element={<VehicleDetail title="Vehicle Detail" />} />
                <Route path="/assets/vehicles/:vehicleId/edit" element={<VehicleEdit title="Edit Vehicle" />} />
                <Route path="/assets/vehicles/:vehicleId/fuel" element={<VehicleFuel title="Vehicle Fuel Log" />} />
                <Route path="/assets/vehicles/:vehicleId/maintenance" element={<VehicleMaintenance title="Vehicle Maintenance Log" />} />
                <Route path="/assets/vehicles/:vehicleId/documents" element={<VehicleDocuments title="Vehicle Documents" />} />

                {/* Driver shortcut */}
                <Route path="/my/vehicle" element={<MyVehicle title="My Vehicle (Driver)" />} />

                {/* Fuel, Expenses & Maintenance */}
                <Route path="/fuel" element={<FuelList title="Fuel Entries" />} />
                <Route path="/fuel/new" element={<FuelNew title="New Fuel Entry" />} />
                <Route path="/fuel/:fuelId" element={<FuelDetail title="Fuel Entry Detail" />} />

                <Route path="/expenses" element={<ExpensesList title="Expenses" />} />
                <Route path="/expenses/new" element={<ExpenseNew title="New Expense" />} />

                <Route path="/maintenance" element={<MaintenanceList title="Maintenance Records" />} />
                <Route path="/maintenance/new" element={<MaintenanceNew title="New Maintenance Record" />} />

                {/* Hubs, Zones */}
                <Route path="/hubs" element={<HubsList title="Hubs / Warehouses" />} />
                <Route path="/hubs/new" element={<HubsNew title="New Hub" />} />
                <Route path="/hubs/:hubId" element={<HubsDetail title="Hub Detail" />} />

                <Route path="/zones" element={<ZonesList title="Zones / Service Areas" />} />
                <Route path="/zones/new" element={<ZoneNew title="New Zone" />} />
                <Route path="/zones/:zoneId" element={<ZoneDetail title="Zone Detail" />} />

                {/* Pricing & Rate Cards */}
                <Route path="/pricing/rate-cards" element={<RateCardsList title="Rate Cards" />} />
                <Route path="/pricing/rate-cards/new" element={<RateCardNew title="New Rate Card" />} />
                <Route path="/pricing/rate-cards/:rateCardId" element={<RateCardDetail title="Rate Card Detail" />} />

                {/* Reports & Audit */}
                <Route path="/reports" element={<ReportsIndex title="Reports Index" />} />
                <Route path="/reports/deliveries" element={<ReportsDeliveries title="Report: Deliveries" />} />
                <Route path="/reports/trips" element={<ReportsTrips title="Report: Trips" />} />
                <Route path="/reports/fuel" element={<ReportsFuel title="Report: Fuel" />} />
                <Route path="/reports/vehicles" element={<ReportsVehicles title="Report: Vehicles" />} />
                <Route path="/reports/finance" element={<ReportsFinance title="Report: Finance" />} />
                <Route path="/reports/employee-performance" element={<ReportsEmployeePerformance title="Report: Employee Performance" />} />
                <Route path="/audit-log" element={<AuditLog title="Audit Log" />} />

                {/* Print-only */}
                <Route path="/print/trip-sheet/:tripId" element={<PrintTripSheet title="Print: Trip Sheet" />} />
                <Route path="/print/delivery-labels/:deliveryId" element={<PrintDeliveryLabels title="Print: Delivery Labels" />} />
                <Route path="/print/vehicle-log/:vehicleId/:range?" element={<PrintVehicleLog title="Print: Vehicle Log" />} />

                {/* Settings & Account */}
                {/* <Route path="/notifications" element={<Notifications title="Notifications" />} />
                <Route path="/settings" element={<Settings title="Settings" />} />
                <Route path="/settings/profile" element={<SettingsProfile title="Settings › Profile" />} />
                <Route path="/settings/company" element={<SettingsCompany title="Settings › Company" />} />
                <Route path="/settings/roles" element={<SettingsRoles title="Settings › Roles & Permissions" />} />
                <Route path="/settings/notifications" element={<SettingsNotifications title="Settings › Notifications" />} />
                <Route path="/settings/backup" element={<SettingsBackup title="Settings › Backup / Export / Import" />} />
                <Route path="/settings/preferences" element={<SettingsPreferences title="Settings › Preferences" />} />
                <Route path="/me" element={<Me title="My Profile" />} /> */}

                {/* Fallback */}
                <Route path="*" element={<NotFound title="Not Found" note="This route is not configured yet." />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
