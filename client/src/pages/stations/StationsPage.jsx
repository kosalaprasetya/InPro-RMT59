/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  fetchStations } from '../../features/stationsSlice';
import http from '../../helpers/http';
import StationCard from '../../components/StationCard';

const StationsPage = () => {


  const dispatch = useDispatch();
  const stations = useSelector(state => state.stations.data)
  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);


  console.log(stations)

  return (
    <div className='bg-slate-800 min-h-screen py-8 px-2'>
      <div className="stations-list flex flex-col gap-4 justify-center items-center lg:flex-row lg:flex-wrap">
        {stations.map((station, index) => {
          return (
            <StationCard {...station} key={index}/>
          )
        })}
      </div>
    </div>
  )
}

export default StationsPage