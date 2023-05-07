import { configureStore, createSlice } from '@reduxjs/toolkit'

type MesUser = {
  id : string
}

const userSlice = createSlice<MesUser,any, any>({
  name : "UserSlice",
  initialState : {
    id : "",
    userName : "No_Name",
    userToken : "LHF00",
    permissions : [{}],
    miscInfo : {}
  },
  reducers: {
    setUser : (state, action) =>{
      alert(JSON.stringify(action.payload))
      state.id = action.payload.id
      state.userName = action.payload.userName
      state.userToken= action.payload.userToken
      state.permissions = action.payload.permissions
      state.miscInfo = action.payload.miscInfo
    }
      
  }
})


export const { setUser } = userSlice.actions

export default configureStore({
  reducer: {user : userSlice.reducer},
})
