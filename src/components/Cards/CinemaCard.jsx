import { useSelector, useDispatch } from "react-redux"
import { setSelectedCinema, setSelectedTime } from "@/store/orderSlice"

const CinemaTime = ({ isSelectedCinema, cinema, time }) => {
  const dispatch = useDispatch()
  const isSelectedTime = Boolean(useSelector((state) => state.order.selectedTime) === time)

  return (
    <div className={`
    w-14
    h-7 
    mr-1 
    mt-2
    border
    rounded-lg 
    border-white
    hover:bg-yellow-500
    hover:cursor-pointer
    ${isSelectedTime && isSelectedCinema && 'bg-yellow-500'}
     `}
      onClick={() => {
        const { id, name, address } = cinema

        dispatch(setSelectedCinema({ id, name, address }))
        dispatch(setSelectedTime(time))
      }}
    >
      <span className="flex justify-center items-center text-white text-xs text-center pt-1">{time}</span>
    </div>
  )
}

const CinemaCard = ({ cinema }) => {
  const isSelectedCinema = Boolean(useSelector((state) => state.order.selectedCinema?.id) === cinema.id)

  return (
    <div className={`
    w-10/12
    md:w-5/12
    min-h-36
    h-auto
    p-2
    mx-1
    shrink-0
    bg-primary-500
    rounded-lg
    ${isSelectedCinema ? 'border-2 border-yellow-500' : ''}
    `}
    >
      <div className='w-full flex flex-row justify-between text-base font-normal text-white'>
        <span className="w-8/12 truncate">{cinema.name}</span>
        <span className="w-4/12 text-sm text-right font-semibold"> Rp.300.000 </span>
      </div>
      <div className='flex flex-wrap text-xs font-light text-white'>{cinema.address}</div>
      <div className="flex flex-wrap mt-3">
        {cinema?.time?.map((time) => <CinemaTime key={time} isSelectedCinema={isSelectedCinema} cinema={cinema} time={time} />)}
      </div>
    </div>
  )
}

export default CinemaCard