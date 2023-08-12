import { useContext } from "react";
import { MyAuthContext } from "../../context/MyAuthProvider";

// Hook sử dụng ngữ cảnh xác thực
export const useMMAuthentication = () => {
  return useContext(MyAuthContext);
};