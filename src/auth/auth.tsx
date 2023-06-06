import { supabase } from "../lib/supabase";
import store, { resetUser } from "../store";

export const MesUserLogOut = async () => {
  store.dispatch(resetUser());
  await supabase.auth.signOut();
};
