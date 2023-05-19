import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { DoECheckData, database } from './dataMock'
import { renderToReadableStream } from 'react-dom/server'
import localforage from 'localforage'

export type MesUser = {
  id: string,
  userName: string,
  userToken: string,
  permissions: Object[],
  miscInfo: any,
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
    initUser: (state: MesUserState)=>{
      const mesuser = database.user
      state.user = mesuser
      console.log("[I] initUser: " + JSON.stringify(state.user) )
    },
    setUser: (state: MesUserState, action: PayloadAction<MesUserState>) => {
      //alert(JSON.stringify(action.type))
      //console.log(action.payload)
      state.user.id = action.payload.user.id
      state.user.userName = action.payload.user.userName
      state.user.userToken = action.payload.user.userToken
      state.user.permissions = action.payload.user.permissions
      state.user.miscInfo = action.payload.user.miscInfo,
      state.user.isAuthed = action.payload.user.isAuthed

      localforage.setItem<MesUserState>("sv_MesUser",action.payload)
    },
    getUser: (state: MesUserState) =>{
      return state
    }
  }
})

export const { getUser,  setUser, initUser } = userSlice.actions


const store = configureStore({
  reducer: { mesUserStore: userSlice.reducer },
})

export type IRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

//store.dispatch(initUser())

export default store;
