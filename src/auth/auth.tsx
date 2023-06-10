import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const MesUserLogOut = async () => {
  // store.dispatch(resetUser());
  const { error } = await supabase.auth.signOut()
  return error
};

export const MesUserLogin = async () => {
  throw new Error("Not implement!!4")
}

export const MesUserGetSession = async (): Promise<Session | null> => {
  let { data } = await supabase.auth.getSession()
  if (data.session == null) {
    return null
  } else
    return data.session
}
