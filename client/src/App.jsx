import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/stations/StationsPage";
import TrainsPage from "./pages/trains/TrainsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="/stations" element={<StationsPage/>} />
          <Route path="/trains" element={<TrainsPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
