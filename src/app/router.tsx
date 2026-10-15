import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarsPage } from "@/features/cars/pages/CarsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CarsPage />} />
    </Routes>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
