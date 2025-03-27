import React, { useEffect, useState } from 'react'
import http from '../../helpers/http';
import TrainCard from '../../components/TrainCard';
import Swal from 'sweetalert2';

const TrainsPage = () => {

  const [trains, setTrains] = useState([]);

  const fetchTrainData = async () => {
    try {
      const response = await http({
        method: "GET",
        url: "/trains",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      setTrains(response.data);
    } catch (error) {
      console.error(error)
      Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message,
            });
    } 
  }

  useEffect(() => {
    fetchTrainData();
  }, [])

  console.log(trains)

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-2'>
      <div className="train-list flex flex-col gap-4 justify-center items-center lg:flex-row lg:flex-wrap">
      {trains.map((station, index) => {
          return (
            <TrainCard {...station} key={index}/>
          )
        })}
      </div>
    </div>
  )
}

export default TrainsPage