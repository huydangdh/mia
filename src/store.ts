import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { DoECheckData } from './dataMock'
import { renderToReadableStream } from 'react-dom/server'

export type MesUser = {
  id: string,
  userName: string,
  userToken: string,
  permissions: Object[],
  miscInfo: {},
  isAuthed: Boolean
}

export type MesUserState = {
  user: MesUser
}

const initialState: MesUserState = {
  user: {
    id: "",
    userName: "No_Name",
    userToken: "LHF00",
    permissions: [{}],
    miscInfo: {},
    isAuthed: false
  }
}

const userSlice = createSlice({
  name: "MesUser",
  initialState,
  reducers: {
    init: (state: MesUserState)=>{
      let mesuser = DoECheckData()
      if(mesuser == undefined) return undefined 
    },
    setUser: (state: MesUserState, action: PayloadAction<MesUserState>) => {
      alert(JSON.stringify(action.type))
      state.user.id = action.payload.user.id
      state.user.userName = action.payload.user.userName
      state.user.userToken = action.payload.user.userToken
      state.user.permissions = action.payload.user.permissions
      state.user.miscInfo = action.payload.user.miscInfo,
      state.user.isAuthed = action.payload.user.isAuthed
    }

  }
})

export const { setUser, init } = userSlice.actions


const store = configureStore({
  reducer: { user: userSlice.reducer },
})

export type IRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
