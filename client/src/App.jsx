import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/stations/StationsPage";
import TrainsPage from "./pages/trains/TrainsPage";
import StationsSchedulePage from "./pages/stations/StationsSchedulePage";
import AddSchedulePage from "./pages/AddSchedulePage";
import UpdateSchedulePage from "./pages/UpdateSchedulePage";
import TrainsSchedulePage from "./pages/trains/TrainsSchedulePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="/stations" element={<StationsPage/>} />
          <Route path="/stations/:stationCode" element={<StationsSchedulePage/>} />
          <Route path="/stations/:stationCode/add-schedule" element={<AddSchedulePage/>} />
          <Route path="/stations/:scheduleId/update-schedule" element={<UpdateSchedulePage/>} />
          <Route path="/trains" element={<TrainsPage/>} />
          <Route path="/trains/:trainNumber" element={<TrainsSchedulePage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
