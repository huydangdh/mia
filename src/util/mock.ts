import localforage from "localforage";
import { database } from "../dataMock";
import store, { MesUser } from "../store";

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

