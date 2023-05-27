import store, { resetUser } from "../store";

export const MesUserLogOut = () => {
  store.dispatch(resetUser());
};
