/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import http from "../helpers/http";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await http({
        url: "/auth/login",
        method: "POST",
        data: {
          email,
          password,
        },
      })
      localStorage.setItem('access_token', response.data["access_token"]);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-800">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};
export default LoginPage;
