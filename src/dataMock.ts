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
    miscInfo: ""
  },
  mes_app: [{
    app_id : "A001",
    app_name: "WorkTimeRecord",
    app_func: "ADD|DELETE"
  }]
}

export const errors = {
  uname: "invalid username",
  pass: "invalid password"
};


