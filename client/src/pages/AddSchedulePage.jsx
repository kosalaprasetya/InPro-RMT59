/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import http from '../helpers/http'

const AddSchedulePage = () => {
  const {stationCode} = useParams()
  const [station, setStation] = useState([])
  const [trains, setTrains] = useState([])
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [isPassingOnly, setIsPassingOnly] = useState(false);
  const [isTerminus, setIsTerminus] = useState(false);
  const [trainId, setTrainId] = useState('');

  const navigate = useNavigate()

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
    } 
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const obj =  {
            arrival: arrival,
            departure: departure,
            isPassingOnly: isPassingOnly,
            isTerminus: isTerminus,
            trainId: trainId || 1,
            stationId: station.id
        }
        
        const res = await http({
            method: "POST",
            url: "/schedules",
            headers:{
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: obj
        })
        console.log(res)
        navigate(-1)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getStationData()
    getTrainData()
  },[])

  console.log(trains)

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-4 flex justify-center'>
        <div className="station-info bg-slate-700 p-4 rounded-md w-full lg:max-w-1/2">
          <div className="flex flex-col gap-4 items-center">
            <p className='text-center text-xl font-medium py-8'>Tambah Jadwal {station.stationName}</p>
            <form action="" className='flex flex-col gap-4 justify-center items-start w-md max-w-full' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="train">Nama Kereta Api</label>
                    <select id='train' defaultValue={5} className="select select-primary w-full" onChange={(e)=>setTrainId(e.target.value)} required>
                        {trains.map((train, index) => {
                            return (
                                <option key={index} value={train.id}>{`${train.trainName} (KA ${train.trainNumber}`}) | {`${train.from}-${train.to}`}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="input w-full">
                    <label htmlFor="arrival">Kedatangan</label>
                    <input type="time" id='arrival' className="input" name='arrival' value={arrival} onChange={(e)=>setArrival(e.target.value)} required/>
                </div>
                <div className="input w-full">
                    <label htmlFor="departure">Keberangkatan</label>
                    <input type="time" id='departure' className="input" name='departure' value={departure} onChange={(e)=>setDeparture(e.target.value)} required/>
                </div>
                <div className="check flex gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary" name='isTerminus' value={isTerminus} onChange={(e)=>setIsTerminus(e.target.value)} />
                    <label htmlFor="arrival">Terminus</label>
                </div>
                <div className="check flex gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary" name='isPassingOnly' value={isPassingOnly} onChange={(e)=>setIsPassingOnly(e.target.value)} />
                    <label htmlFor="arrival">Langsung</label>
                </div>
                
                <div className="button w-full">
                    <button className="btn btn-primary w-full" type='submit'>Kirim</button>
                </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default AddSchedulePage