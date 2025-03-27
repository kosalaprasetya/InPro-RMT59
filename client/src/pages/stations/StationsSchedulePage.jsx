/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import http from '../../helpers/http'
import Swal from 'sweetalert2';

const StationsSchedulePage = () => {
  const { stationCode } = useParams()
  const [station, setStation] = useState([])
  const [schedules, setSchedules] = useState([])
  const [weather, setWeather] = useState([])
  const [aiResponse, setAiResponse] = useState("")

  const getWeather = async () => {
    try {
        const region = station.stationRegion
        const res = await http({
            method: "GET",
            url: region ? `/utils/weather/${region}` : `/utils/weather/surabaya`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        setWeather(res.data)
    } catch (error) {
        console.log(error)
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              });
    }
  }

  const getAiResponse = async () => {
    try {
      const res = await http({
        method: "POST",
        url: "/utils/ai",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        data: {
          message: `Give some schedule from stations around ${station.stationRegion}, explain in in human readable language, do not insert difficult information from the json, if weather: ${(weather.current?.condition?.text)} available, show the weather condition, and if not available, say that the weather is not available. If all information unavailable, show the user random schedule. Don't show it literally, just show the schedule. Do not say that the data unvailable, just show the schedule. Do not show .md format, just show plain string.`
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

  const getStationData = async () => {
    try {
        const res = await http({
            method: "GET",
            url: `/stations/${stationCode}`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        setStation(res.data)
    } catch (error) {
        console.log(error)
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              });
    }
  }

  const getSchedule = async () => {
    try {
        const res = await http({
            method: "GET",
            url: `/schedules/station/${stationCode}`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        setSchedules(res.data)
    } catch (error) {
        console.log(error)
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              });
    }
  }

  const handleDeleteSchedule = async (scheduleId) => {
    try {
        const res = await http({
            method: "DELETE",
            url: `/schedules/${scheduleId}`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        console.log(res)
        getSchedule()
    } catch (error) {
        console.log(error)
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              });
    }
  }

    useEffect(()=>{
        getStationData()
        getSchedule()
        getWeather()
        if(weather && station){
            getAiResponse()
        }
    },[])

    console.log(weather.current?.condition?.text)

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-4 flex justify-center'>
        <div className="station-info bg-slate-700 p-4 rounded-md flex flex-col gap-4 w-full lg:max-w-1/2">
            <Link to={-1} className="btn btn-accent w-16 self-end">Back</Link>
            <div className="station-name flex justify-between items-center">
                <h1 className='font-medium text-xl'>{station.stationName}</h1>
                <p className='font-bold text-xl'>{stationCode}</p>
            </div>
            <div className="station-name flex flex-col">
                <p>Stasiun ini berada dalam wilayah pengelolaan <span className='font-medium'>{station.stationOperationalArea}</span> dan terletak di kota {station.stationRegion}</p>
            </div>
            <div className="add-schedule">
                <Link to={`/stations/${stationCode}/add-schedule`} className='btn btn-soft btn-primary text-white'>Tambah Jadwal</Link>
            </div>
            <div className="schedule flex flex-col gap-4">
                <p>Jadwal yang tercatat di stasiun ini:</p>
                {schedules.length > 0 ? 
                schedules.map((schedule, index) => {
                    return (
                        <div key={index} className='py-4 rounded-md flex w-full justify-between items-center bg-slate-800 px-2'>
                            <div className="l text-left flex flex-col">   
                                <p className='font-medium'>KA {schedule.train.trainName}</p>
                                <p className='text-sm'>Relasi {schedule.train.from}-{schedule.train.to}</p> 
                                <div className='action flex gap-2 mt-2'>
                                    <div className="delete">
                                        <button
                                        className="btn btn-active btn-error btn-xs"
                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                        >Hapus</button>
                                    </div>
                                    <div className="delete">
                                        <Link to={`/stations/${schedule.id}/update-schedule`}
                                        className="btn btn-active btn-warning btn-xs"
                                        >Ubah</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="r flex items-center gap-2">
                                <div className="text-right">
                                    <p>{(schedule.arrival ? `Kedatangan ${schedule.arrival}` : '')}</p>
                                    <p>{(schedule.departure ? `Keberangkatan ${schedule.departure}` : '')}</p>
                                </div>
                            </div>
                        </div>
                        )
                })
                : <p className='text-center pt-10 italic font-bold'>Tidak ada jadwal yang tercatat</p>}

                <div className="weather flex flex-col gap-2">
                    <p>Informasi cuaca saat ini:</p>
                    <p className='font-bold text-2xl'>{(weather.current?.condition?.text)}</p>
                    <p>{aiResponse}</p>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default StationsSchedulePage