import { PayloadAction, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'

export type MesUser = {
  id : string,
  userName: string,
  userToken: string,
  permissions: Object[],
  miscInfo: {}
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
    setUser : (state: MesUser, action: PayloadAction<MesUser>) =>{
      alert(JSON.stringify(action.type))
      state.id = action.payload.id
      state.userName = action.payload.userName
      state.userToken= action.payload.userToken
      state.permissions = action.payload.permissions
      state.miscInfo = action.payload.miscInfo
      
      return
    }
      
  }
})

export const { setUser } = userSlice.actions


const store =  configureStore({
  reducer: {user : userSlice.reducer},
})

export type IRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
