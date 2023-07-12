import { supabase } from "../../lib/supabase";

const MMPermissions = {
  // Constants for CRUD operations
  RUN: "RUN",
  CREATE: "CREATE",
  READ: "READ",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

const MM_APPLICATION_ID = {
  WorkTimeAdd:"223981ea-384d-4e4d-a6d4-56cf1dbe4e54",
  WorkTimeQuery: "0ca3deec-ff59-4d4c-8771-7a8e6127ad95"
} 

const FCheckRoleUser = async (userID: string, appID: string, roleName: string) => {
  const { error, data, status } = await supabase.rpc("f_check_role_user_application", {
    in_user_id: userID,
    in_app_id: appID,
    in_role_name: roleName,
  });
  if(error) console.log('FCheckRoleUser: ', error)

  if (status === 200) {
    return data !== false;
  } else {
    return false;
  }
}
// Export the constants
export {MMPermissions, FCheckRoleUser, MM_APPLICATION_ID};