import { EPermissions } from "../../PermissionsUtil";

export default interface IApp {
  name: string;
  permissions: EPermissions[];
  url: string;
}
