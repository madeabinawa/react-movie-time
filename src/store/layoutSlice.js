
import { createSlice } from "@reduxjs/toolkit"

const initialState = { isOpenSidebar: false }

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    setSidebar: (state, action) => ({ isOpenSidebar: !(state.isOpenSidebar) }),
  }
})

export const { setSidebar } = layoutSlice.actions

export default layoutSlice.reducer