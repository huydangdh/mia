import { supabase } from "../lib/supabase";
import store, { resetUser } from "../store";

export const MesUserLogOut = async () => {
  // store.dispatch(resetUser());
  const { error } = await supabase.auth.signOut()
  return error
};
