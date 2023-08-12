// /src/services/model/MMUser.ts
//

import { EPermissions } from "../../PermissionsUtil";

export interface AuthData {
  user: User;
  accessToken?: string;
  provider: string;
}

export interface User {
  id: string;
  email?: string;
  username: string;
  password?: string;
  permissions: EPermissions[];
}

