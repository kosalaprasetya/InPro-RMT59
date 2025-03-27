import { Link } from "react-router"

const StationCard = ({stationName, stationRegion, stationCode, schedules}) => {
  return (
    <div className="card bg-sky-900 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">{stationName} ({stationCode})</h2>
            <p>{stationRegion}</p>
            <p>{schedules.length} Schedule</p>
            <div className="card-actions justify-end">
                <Link to={`/stations/${stationCode}`} className='btn bg-slate-800'>See Schedules</Link>
            </div>
        </div>
    </div>
  )
}

export default StationCard