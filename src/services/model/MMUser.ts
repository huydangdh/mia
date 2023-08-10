// /src/services/model/MMUser.ts
//

interface User {
  id: string;
  email?: string;
  username: string;
  password: string;
 permissions: string[];
}

export default User;

