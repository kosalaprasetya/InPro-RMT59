/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Swal from 'sweetalert2';
import http from '../../helpers/http';

const TrainsSchedulePage = () => {
    const [train, setTrain] = useState({});
    const {trainNumber} = useParams()

    const fetchTrainData = async () => {
        try {
          const response = await http({
            method: "GET",
            url: `/trains/${trainNumber}`,
            headers:{
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          })
          setTrain(response.data);
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
    console.log(train)
  return (
    <div className='bg-slate-800 min-h-screen py-8 px-4 flex justify-center'>
         <div className="station-info bg-slate-700 p-4 rounded-md flex flex-col gap-4 w-full lg:max-w-1/2">
            <Link to={-1} className="btn btn-accent w-16 self-end">Back</Link>
            <div className="station-name flex justify-between items-center">
                <h1 className='font-medium text-xl'>{train.trainName}</h1>
                <p className='font-bold text-xl'>{trainNumber}</p>
            </div>
            <div className="station-name flex flex-col">
                <p><span className='font-medium'></span></p>
            </div>
            <div className="add-schedule">
                <Link to={''} className='btn btn-soft btn-primary text-white'>Tambah Jadwal</Link>
            </div>
            <div className="schedule flex flex-col gap-4">
            </div>
        </div>
    </div>
  )
}

export default TrainsSchedulePage