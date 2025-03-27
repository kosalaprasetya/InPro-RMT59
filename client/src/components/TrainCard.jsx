import React from 'react'
import { Link } from 'react-router'

const TrainCard = ({trainName, trainNumber, from, to}) => {
  return (
    <div className="card bg-sky-900 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">{trainName}</h2>
            <p className='font-bold'>{trainNumber}</p>
            <div className="destination flex flex-row">
              <p>{from} - {to}</p>
            </div>
            <div className="card-actions justify-end">
                <Link to={`/trains/${trainNumber}`} className='btn bg-slate-800'>See Stops</Link>
            </div>
        </div>
    </div>
  )
}

export default TrainCard