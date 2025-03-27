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
    <div className="main flex gap-4 justify-center p-6 bg-none bg-slate-800">
        <Link to={'/stations'} className='bg-slate-700 w-2xs rounded-md text-white px-4 py-2 font-medium h-12 text-center cursor-pointer'>Stations List</Link>
        <Link to={'/trains'} className='bg-slate-700 w-2xs rounded-md text-white px-4 py-2 font-medium h-12 text-center cursor-pointer'>Train List</Link>
    </div>
    <Outlet />
    </>
  );
};

export default MainLayout;
