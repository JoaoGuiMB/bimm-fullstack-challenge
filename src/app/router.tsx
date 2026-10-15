import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarDetailPage } from "@/features/cars/pages/CarDetailPage";
import { CarsPage } from "@/features/cars/pages/CarsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CarsPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
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
