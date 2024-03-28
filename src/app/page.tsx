"use client";
import { MD5 } from "crypto-js";
import { cn } from "@/app/components/utils/cn";
import React, { useState } from "react";
import axios from "axios"; //untuk API ke PHP
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../app/components/ui/3d-card";
//form
import { Label } from "../app/components/ui/label";
import { Input } from "../app/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // cek username and password
    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    setLoading(true);
    const delay = Math.floor(Math.random() * (2000 - 500) + 500);

    try {
      const hashedPassword = MD5(password).toString(); // Hash pasword pakai MD5
      console.log("Username:", username);
      console.log("Password:", hashedPassword);
      const data = {
        username,
        password: hashedPassword, // kirim password ke Backend
      };

      // Send login request
      const response = await axios.post(
        "http://loginreact.test/backend%20login.php",
        data
      );

      // Handle successful login
      if (response.data.success) {
        console.log("Login successful:", response.data);
        localStorage.setItem("isLoggedIn", true.toString());
        navigate("/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Selamat datang di Login PHP test
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Isi <span className=" text-yellow-500">Username</span> dan{" "}
          <span className=" text-red-500">password</span>
          dengan benar
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <form
            className="my-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="projectmayhem@fc.com"
                type="text"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Menunggu API..." : "Login →"}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
