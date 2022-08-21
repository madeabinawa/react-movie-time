import React from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSeat } from "@/store/orderSlice";

const SeatMap = () => {
  const dispatch = useDispatch();
  const takenSeat = useSelector((state) => state.order.takenSeat);
  const selectedSeat = useSelector((state) => state.order.selectedSeat);
  const seatRow = _.range(65, 69)
  const seatNumber = _.range(1, 13)
  const seatStep = [2, 7, 11]

  return (
    <div className='w-full h-auto pb-3 overflow-x-scroll scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
      {seatRow.map((row, index) => {
        return (
          <div key={index} className='w-full flex flex-col mt-2'>
            <div className='w-full flex'>
              {seatNumber.map((number, index) => {
                const isTaken = takenSeat.includes(`${row}-${number}`)
                const isSelected = selectedSeat.includes(`${row}-${number}`)
                const isSeatStep = seatStep.includes(number)

                return (
                  <button
                    key={index}
                    disabled={isTaken}
                    onClick={() => dispatch(setSelectedSeat(`${row}-${number}`))}
                    className={`
                    w-12 h-12 shrink-0 text-white text-sm rounded-lg my-1 ml-1
                   ${isSeatStep ? 'mr-6' : 'mr-1'} 
                   ${isTaken ? 'hover:bg-gray-500' : isSelected ? 'hover:bg-yellow-500' : 'hover: bg-primary-600'}
                   ${isTaken ? 'bg-gray-500' : isSelected ? 'bg-yellow-500' : 'bg-primary-500'}
                   ${isTaken ? 'hover:cursor-default' : 'hover:cursor-pointer'}
                   `}>
                    {`${String.fromCharCode(row)} ${number}`}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SeatMap