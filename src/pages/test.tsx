import moment from "moment";
import { MesUICard, MesUIModal } from "../MesUI";

import { useState } from "react";
import { MMPermissions, FCheckRoleUser } from "../api/mes_app/PermissionsAPI";

/**
 * CHECK ROLE USER
 * MOCK:
 * select
 * public.f_check_role_user_application(
 * 'bbc5b75a-a770-42e1-88f4-db11b9d0269f',
 * '0ca3deec-ff59-4d4c-8771-7a8e6127ad95',
 * 'CREATE');
 * @returns {Object}
 */
const CheckRoleUser = () => {
  const [userID, setUserID] = useState("");
  const [appID, setAppID] = useState("");
  const [roleName, setRoleName] = useState(MMPermissions.RUN);

  const handleCheckRole = async () => {
    const isRole = await FCheckRoleUser(userID, appID, roleName);
    if (isRole) {
      alert("The user is in the role.");
    } else {
      alert("The user is not in the role.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        onChange={(e) => setUserID(e.target.value)}
      />
      <input
        type="text"
        placeholder="App ID"
        onChange={(e) => setAppID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role Name"
        onChange={(e) => setRoleName(e.target.value)}
      />
      <button onClick={handleCheckRole}>Check Role</button>
    </div>
  );
};

function TestUI() {
  return (
    <>
      <MesUICard
        card_header={"Header"}
        card_img="/Total.jpg"
        card_title="Title"
        card_body={"VioBody"}
        card_footer={"Footer"}
      />
      {/* <MesUIModal /> */}

      {/* check role */}

      <CheckRoleUser></CheckRoleUser>
    </>
  );
}

console.log(moment("05:00", "hh:mm").hour());

export default TestUI;
