"use client";
import "./globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page";
import SignupFormDemo from "./dashboard"; // Import SignupFormDemo
import ProtectedRoute from "./ProtectedRoute";

export default function Pengarah({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>LoginTest</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body>
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
      </body>
    </html>
  );
}
