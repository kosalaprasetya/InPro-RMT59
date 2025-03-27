import React, { useState } from 'react'
import { Link } from 'react-router'
import http from '../helpers/http'



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
    }
  }

  return (
    <div className='flex min-h-screen w-full  bg-slate-800 text-white p-4 flex-col'>
      
      <form action="" onSubmit={getAiResponse}>
        <input className="input min-h-16 w-full" placeholder="Mau kemana hari ini?" onChange={(event) => setUserInput(event.target.value)}>
        </input>
        <button className="btn btn-primary my-4">Submit</button>
      </form>

      <div className="reponse p-2">{aiResponse}</div>
    </div>
  )
}

export default HomePage