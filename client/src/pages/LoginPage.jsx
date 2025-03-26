import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: email,
          password: password,
        }
      );
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
