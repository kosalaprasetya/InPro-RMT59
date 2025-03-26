import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage/>} />
        </Route>
        <Route element={""}>{/* Protected routes */}</Route>
      </Routes>
    </>
  );
}

export default App;
