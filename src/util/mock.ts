import localforage from "localforage";
import { database } from "../dataMock";
import store, { MesUser } from "../store";
import { json } from "react-router-dom";

const _fakeGetUser = (isSuccess: boolean, timeout: number) => {
  return new Promise<MesUser>((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(database.user);
      } else {
        reject({ error: "User don't exists !!!" });
      }
    }, timeout);
  });
}

const _fakeGetUserLocal = async (_isSuccess: boolean) => {
  let _mesuser = store.getState().mesUserState.user
  _mesuser = await localforage.getItem<MesUser>("sv_MesUser")
  if (_mesuser != null)
    return _mesuser
  else
    return store.getState().mesUserState.user
}

export const GetCurrentUser = async () => {
  return await _fakeGetUserLocal(true)
}


// Server-side

export interface IMM_WorkTimeRecordTBL {
  record_id: string,
  user_id: MesUser["id"],
  start_time: Date,
  end_time: Date
}

export interface IMsgMesResponse {
  error_code: number,
  error_msg: string,
  payload: any,

}

export function APISvr_Add_WorktimeRecord(data: IMM_WorkTimeRecordTBL) {
  let isOk = false

  return new Promise<IMsgMesResponse>((resolve, reject) => {
    setTimeout(() => {
      console.log(`[I] APISvr_Add_WorktimeRecord: ${JSON.stringify(data)}`);
      if (isOk)
        resolve({ error_code: 200, error_msg: "Add_OK", payload: "NotImplement" })
      else{
        let msg : IMsgMesResponse = {
          error_code:400,
          error_msg: "Add_NG",
          payload : "External"
        }
        reject(msg)
      }
    }, 2345)
  })
}
