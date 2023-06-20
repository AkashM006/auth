import { Navigate } from "react-router-dom";

export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: JSX.Element;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) return <Navigate to={redirectPath} />;

  return children;
};

export default ProtectedRoute;
