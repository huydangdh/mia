import localforage from "localforage";
import { MesUser } from "./store";

type databaseMock = {
  user: MesUser
  mes_app: IMESAPP_TBL[]
}


interface IMESAPP_TBL {
  app_id: string,
  app_name: string,
  app_func: string,
  app_href: string
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
      role: "admin",
    }, {
      app_name: "WorktimeQuery",
      role: "admin"
    }],
    miscInfo: {
      start_time: "05:00"
    }
  },
  mes_app: [{
    app_id: "A001",
    app_name: "WorkTimeRecord",
    app_func: "ADD|DELETE|VIEW",
    app_href: "WorkTimeRecord"
  },
  {
    "app_id": "A002",
    "app_name": "WorkTimeQuery",
    "app_func": "VIEW",
    "app_href": "WorkTimeQuery"
  }
  ]
}

export const DoECheckData = (): MesUser | undefined => {
  let mesuser: MesUser | undefined = undefined
  localforage.getItem<MesUser | undefined>("sv_MesUser").then((value) => {
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
  ROOT: "/",
  APP_URL_ROOT: "app/",
  // worktime
  APP_WORKTIME_RECORD: "WorkTimeRecord",
  APP_WORKTIME_QUERY: "WorkTimeQuery"
}
