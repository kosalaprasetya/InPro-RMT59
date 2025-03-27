/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import http from '../helpers/http'
import Swal from 'sweetalert2';

const UpdateSchedulePage = () => {
  const {scheduleId} = useParams()
  const [schedule, setSchedule] = useState({})
  const [stations, setStations] = useState([])
  const [trains, setTrains] = useState([])
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [isPassingOnly, setIsPassingOnly] = useState(false);
  const [isTerminus, setIsTerminus] = useState(false);
  const [trainId, setTrainId] = useState('');
  const [stationId, setStationId] = useState('');

  const navigate = useNavigate()


  const getScheduleById = async () => {
    try {
      const res = await http({
        method: "GET",
        url: `/schedules/${scheduleId}`,
        headers:{
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      setSchedule(res.data)
      setTrainId(res.data.train.id)
      setStationId(res.data.station.id)
      setArrival(res.data.arrival)
      setDeparture(res.data.departure)
      setIsPassingOnly(res.data.isPassingOnly)
      setIsTerminus(res.data.isTerminus)
    } catch (error) {
      console.log(error)
      Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message,
            });
    }
  }
  const getStationsData = async () => {
    try {
        const res = await http({
            method: "GET",
            url: `/stations`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        setStations(res.data)
    } catch (error) {
        console.log(error)
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              });
    }
  }
  const getTrainData = async () => {
    try {
      const res= await http({
        method: "GET",
        url: "/trains",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      setTrains(res.data)
    } catch (error) {
      console.error(error)
      Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message,
            });
    } 
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //localhost:3000/schedules/33
        navigate(-1)
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
    getStationsData()
    getTrainData()
    getScheduleById()
  },[])

  console.log(schedule)

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-4 flex justify-center'>
        <div className="station-info bg-slate-700 p-4 rounded-md w-full lg:max-w-1/2">
          <div className="flex flex-col gap-4 items-center">
            <p className='text-center text-xl font-medium py-8'>Ubah Jadwal</p>
            <form action="" className='flex flex-col gap-4 justify-center items-start w-md max-w-full' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="train">Nama Kereta Api</label>
                    <select id='train' value={trainId} className="select select-primary w-full" onChange={(e)=>setTrainId(e.target.value)} required>
                        {trains.map((train, index) => {
                            return (
                                <option key={index} value={train.id}>{`${train.trainName} (KA ${train.trainNumber}`}) | {`${train.from}-${train.to}`}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="train">Nama Stasiun</label>
                    <select id='train' value={stationId} className="select select-primary w-full" onChange={(e)=>setStationId(e.target.value)} required>
                        {stations.map((station, index) => {
                            return (
                                <option key={index} value={station.id}>{`${station.stationName}`} | {`${station.stationRegion}`}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="input w-full">
                    <label htmlFor="arrival">Kedatangan</label>
                    <input type="time" id='arrival' className="input" name='arrival' value={arrival} onChange={(e)=>setArrival(e.target.value)}/>
                </div>
                <div className="input w-full">
                    <label htmlFor="departure">Keberangkatan</label>
                    <input type="time" id='departure' className="input" name='departure' value={departure} onChange={(e)=>setDeparture(e.target.value)}/>
                </div>
                <div className="check flex gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary" name='isTerminus' checked={isTerminus} onChange={(e)=>setIsTerminus(!isTerminus)} />
                    <label htmlFor="arrival">Terminus</label>
                </div>
                <div className="check flex gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary" name='isPassingOnly' checked={isPassingOnly} onChange={(e)=>setIsPassingOnly(!isPassingOnly)} />
                    <label htmlFor="arrival">Langsung</label>
                </div>
                
                <div className="button w-full flex flex-col gap-2">
                    <button className="btn btn-primary w-full" type='submit'>Kirim</button>
                    <Link to={-1} className="btn btn-secondary w-full" type='submit'>Kembali</Link>
                </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default UpdateSchedulePage