import localforage from "localforage";
import { MesUser } from "./store";

type databaseMock = {
  user: MesUser
  mes_app: any
}


// User Login info
export const database: databaseMock = {
  user: {
    id: "LHF00001",
    userName: "Dang Quang Huy",
    userToken: "LHF^TOKEN^21071996",
    isAuthed: true,
    permissions: [{
      app_name: "WorkTimeRecord",
      role: "admin"
    }],
    miscInfo: {
      start_time:"05:00"
    }
  },
  mes_app: [{
    app_id : "A001",
    app_name: "WorkTimeRecord",
    app_func: "ADD|DELETE"
  }]
}

export const DoECheckData = (): MesUser | undefined => {
  let mesuser: MesUser | undefined = undefined
  localforage.getItem<MesUser | undefined>("sv_MesUser").then((value)=>{
    console.log("[I] LocalStorage_MesUser : " + value)
    mesuser = database.user
    console.log(mesuser)

  })
  return mesuser
}

export const errors = {
  uname: "invalid username",
  pass: "invalid password"
};


export const APP_URL = {
  ROOT : "/",
  APP_URL_ROOT : "app",
  APP_WORKTIME_RECORD: "WorkTimeRecord"
}
