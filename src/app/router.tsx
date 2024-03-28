"use client";
import "./globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page";
import SignupFormDemo from "./dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SignupFormDemo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
