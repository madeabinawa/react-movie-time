import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
  selectedDate: null,
  selectedCinema: null,
  selectedTime: null,
  ticketPrice: 0,
  selectedSeat: [],
  takenSeat: ['65-5', '65-6', '66-11', '66-12', '67-4', '67-3', '68-4', '68-7'],
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => ({ ...state, selectedMovie: action.payload }),
    setSelectedDate: (state, action) => ({ ...state, selectedDate: action.payload }),
    setSelectedCinema: (state, action) => ({ ...state, selectedCinema: action.payload }),
    setSelectedTime: (state, action) => ({ ...state, selectedTime: action.payload }),
    setTicketPrice: (state, action) => ({ ...state, ticketPrice: action.payload }),
    setSelectedSeat: (state, action) => {
      const seat = action.payload
      const isAlreadySelected = Boolean(state.selectedSeat.find((e) => e === seat))
      const sortedSeat = (seat) => seat.sort((a, b) => a.split('-')[1] - b.split('-')[1]).sort((a, b) => a.split('-')[0] - b.split('-')[0])

      if (isAlreadySelected) {
        const selectedSeat = [...state.selectedSeat]
        selectedSeat.splice(selectedSeat.indexOf(seat), 1)

        return { ...state, selectedSeat }
      }

      return { ...state, selectedSeat: sortedSeat([...state.selectedSeat, seat]) }
    },
    setResetState: () => ({ ...initialState }),
  }
})
export const {
  setSelectedMovie,
  setSelectedDate,
  setSelectedCinema,
  setSelectedTime,
  setTicketPrice,
  setSelectedSeat,
  setResetState
} = orderSlice.actions

export default orderSlice.reducer