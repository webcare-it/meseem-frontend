import { isAuthenticated } from "@/helper";
import { Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};
