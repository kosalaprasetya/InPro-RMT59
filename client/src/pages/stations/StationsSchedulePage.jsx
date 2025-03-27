/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import http from '../../helpers/http'
import formatTime from '../../helpers/formatTime'

const StationsSchedulePage = () => {
  const { stationCode } = useParams()
  const [station, setStation] = useState([])
  const [schedules, setSchedules] = useState([])

  const getStationData = async () => {
    try {
        const res = await http({
            method: "GET",
            url: `/stations/${stationCode}`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const formattedSchedule = res.data.schedules.map(schedule => ({
            ...schedule,
            departureTime: formatTime(schedule.departureTime),
            arrivalTime: formatTime(schedule.arrivalTime),
        }));

        setStation(res.data)
        setSchedules(formattedSchedule)

       
    } catch (error) {
        console.log(error)
    }
  }

useEffect(()=>{
    getStationData()
},[])

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-4 flex justify-center'>
        <div className="station-info bg-slate-700 p-4 rounded-md flex flex-col gap-4 w-full lg:max-w-1/2">
            <div className="station-name flex justify-between items-center">
                <h1 className='font-medium text-xl'>{station.stationName}</h1>
                <p className='font-bold text-xl'>{stationCode}</p>
            </div>
            <div className="station-name flex flex-col">
                <p>Stasiun ini berada dalam wilayah pengelolaan <span className='font-medium'>{station.stationOperationalArea}</span> dan terletak di kota {station.stationRegion}</p>
            </div>
            <div className="add-schedule">
                <Link to={'/'} className='btn btn-soft btn-primary text-white'>Tambah Jadwal</Link>
            </div>
            <div className="schedule flex flex-col gap-4">
                <p>Jadwal yang tercatat di stasiun ini:</p>
                {schedules.length > 0 ? 
                schedules.map((schedule, index) => {
                    return (
                        <div key={index} className='py-4 rounded-md flex w-full justify-between items-center bg-slate-800 px-2'>
                            <div className="l text-left">   
                                <p className='font-medium'>KA {schedule.train.trainName}</p>
                                <p className='text-sm'>Relasi {schedule.train.from}-{schedule.train.to}</p> 
                            </div>
                            <div className="r text-right">
                                <p>Kedatangan {(schedule.arrival)}</p>
                                <p>{(schedule.departure ? `Keberangkatan ${schedule.departure}` : '')}</p>
                            </div>
                        </div>
                        )
                })
                : <p className='text-center pt-10 italic font-bold'>Tidak ada jadwal yang tercatat</p>}
            </div>
        </div>
    </div> 
  )
}

export default StationsSchedulePage