import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export type IMesUserPermisson = {
  appID: string,
  appName: string,

}

export type MesUser = {
  id: string,
  userName: string | undefined,
  userToken: string,
  permissions: Object[] | IMesUserPermisson[],
  miscInfo: any,
  isAuthed: Boolean
}

export type MesUserState = {
  user: MesUser,
  lhf_app : {
    isLoading : Boolean
  }
}

const initialState: MesUserState = {
  user: {
    id: "",
    userName: "No_Name",
    userToken: "LHF00",
    permissions: [{}],
    miscInfo: {},
    isAuthed: false
  },
  lhf_app : {
    isLoading: true
  }
}

const userSlice = createSlice({
  name: "MesUser",
  initialState,
  reducers: {
    initUser: (state: MesUserState) => {
      console.log("[I] initUser: " + JSON.stringify(state.user))
    },
    setUser: (state: MesUserState, action: PayloadAction<MesUser>) => {
      //alert(JSON.stringify(action.type))
      //console.log(action.payload)
      state.user = action.payload
      localforage.setItem<MesUser>("sv_MesUser", action.payload)
    },
    resetUser: (state: MesUserState) => {
      state = initialState
      localforage.clear()
    },
    setLoading: (state: MesUserState, action: PayloadAction<Boolean>) =>{
      state.lhf_app.isLoading = action.payload
    }
  }
})

export const { setUser, initUser, resetUser, setLoading } = userSlice.actions


const store = configureStore({
  reducer: { mesUserState: userSlice.reducer },
})

export type IRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useMesSelector: TypedUseSelectorHook<IRootState> = useSelector

export default store;
