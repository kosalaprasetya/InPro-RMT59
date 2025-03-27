import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import http from '../helpers/http';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await http({
                url: "/auth/register",
                method: "POST",
                data: {
                    email,
                    password,
                    fullName : name
                }
            })
            console.log(res)
            navigate("/login")
        } catch (error) {
            console.log(error)
            Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                  });
        }
    }
  return (
<div className="flex h-screen w-full items-center justify-center bg-slate-800">
    <form className="flex w-md flex-col gap-4 p-4" onSubmit={handleRegister}>
      <div className="title">
        <h2 className="text-center text-xl font-bold text-white">
          Train Scheduler
        </h2>
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="name" className="text-white ">Your name</label>
        </div>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-white bg-gray-600 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email1" className="text-white ">Your email</label>
        </div>
        <input
          id="email1"
          type="email"
          placeholder="name@mail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-white bg-gray-600 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password1" className="text-white ">Your password</label>
        </div>
        <input
          id="password1"
          type="password"
          required
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white bg-gray-600 p-2 rounded-md w-full"
        />
      </div>
      
      <button type="submit" className="cursor-pointer bg-sky-600 text-white font-medium rounded-md p-2 hover:bg-sky-800">Submit</button>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div id="google-login" className="w-full text-center ">
        </div>
        <p>Already have an account? <Link to={'/login'} className="text-slate-300 font-bold">Login Here</Link></p>
      </div>
    </form>
</div>
  )
}

export default RegisterPage