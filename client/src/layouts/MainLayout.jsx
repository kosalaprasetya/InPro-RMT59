/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const MainLayout = () => {
  let navigate = useNavigate();
  const checkToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
    <header className=" text-white drop-shadow-lg bg-cyan-800 flex p-4 items-center justify-between">
      <Link to={'/'} className="font-medium cursor-pointer">Train Scheduler</Link>
      <button className="bg-orange-600 px-4 py-2 rounded-lg cursor-pointer" onClick={
        handleLogout
      }>Logout</button>
    </header>
    <Outlet />
    </>
  );
};

export default MainLayout;
