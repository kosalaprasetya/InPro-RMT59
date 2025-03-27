import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addStations } from '../../features/stationsSlice';

const StationsPage = () => {
  const dispatch = useDispatch();
  const stations = useSelector(state => state.stations)
  useEffect(() => {
    dispatch(addStations());
  }, [dispatch]);
  console.log(stations)
  return (
    <div className='bg-slate-400 min-h-screen'>StationsPage</div>
  )
}

export default StationsPage