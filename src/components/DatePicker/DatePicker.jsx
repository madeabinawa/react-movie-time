import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate } from "@/store/orderSlice"
import { dateFormat } from "@/utils"

const ScrollableDatePicker = () => {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.order.selectedDate)
  const TODAY = new Date()
  const DAY = 24 * 60 * 60 * 1000

  const generateWeekDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(TODAY.getTime() + i * DAY)
      dates.push(date)
    }
    return dates
  }

  const datesInWeek = generateWeekDates()

  const DateItem = ({ date }) => {
    const isToday = dateFormat(date).date === dateFormat(TODAY).date

    const fmtDate = dateFormat(date)
    const isSelectedDate = dateFormat(date).date === dateFormat(selectedDate).date
    const handleSelectDate = (date) => dispatch(setSelectedDate(dateFormat(date).dmy))

    return (
      <div
        className={`flex flex-col mx-1 shrink-0 justify-center items-center w-16 h-20 ${isSelectedDate ? 'bg-yellow-500' : 'bg-primary-500'} rounded-xl hover:cursor-pointer ${isSelectedDate ? 'hover:bg-yellow-500' : 'hover:bg-primary-600'}`}
        onClick={() => handleSelectDate(date)}
      >
        <div className='rounded-full bg-white' style={{ width: 10, height: 10 }}></div>
        <h2 className='text-xs mt-2 text-white font-light'>{`${fmtDate.date} ${fmtDate.monthName}`}</h2>
        <h2 className='text-sm text-white font-normal uppercase'>{isToday ? 'Hari Ini' : fmtDate.dayNameShort}</h2>

      </div>
    )
  }

  return (
    <div className='w-full pb-4 overflow-x-scroll flex flex-nowrap text-white scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
      {datesInWeek.map((date, index) => <DateItem date={date} key={index} />)}
    </div>
  )
}

export default ScrollableDatePicker