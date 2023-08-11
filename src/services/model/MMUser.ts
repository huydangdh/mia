// /src/services/model/MMUser.ts
//

import { EPermissions } from "../../PermissionsUtil";

interface User {
  id: string;
  email?: string;
  username: string;
  password: string;
  permissions: EPermissions[];
}

export default User;

