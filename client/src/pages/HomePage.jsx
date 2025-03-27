import React, { useState } from 'react'
import { Link } from 'react-router'
import http from '../helpers/http'
import Swal from 'sweetalert2';


const HomePage = () => {
  const [userInput, setUserInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const getAiResponse = async (e) => {
    e.preventDefault()
    try {
      const res = await http({
        method: "POST",
        url: "/utils/ai",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        data: {
          message: userInput
        }
      })
      setAiResponse(res.data)
      console.log(res)
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
    <div className='flex min-h-screen w-full bg-slate-800 text-white p-4 flex-col items-center'>
      <form action="" onSubmit={getAiResponse} className='w-full flex flex-col items-center'>
        <input className="input min-h-16 w-full max-w-2xl" placeholder="Mau kemana hari ini?" onChange={(event) => setUserInput(event.target.value)}>
        </input>
        <button className="btn btn-primary my-4">Submit</button>
      </form>

      <div className="reponse p-2">{aiResponse}</div>
    </div>
  )
}

export default HomePage