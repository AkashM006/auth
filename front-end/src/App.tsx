import { Routes, Route } from "react-router-dom";
import LoginView from "./Views/LoginView";
import SignupView from "./Views/SignupView";
import HomeView from "./Views/HomeView";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./Components/ProtectedRoute";
import useToken from "./Hooks/useToken";

function App() {
  const { data, isLoading } = useToken();

  const protectedRouteProps: Omit<ProtectedRouteProps, "children"> = {
    isAllowed: !!data?.accessToken,
    redirectPath: "/login",
  };

  const authRouteProps: Omit<ProtectedRouteProps, "children"> = {
    isAllowed: !data?.accessToken,
    redirectPath: "/",
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute {...authRouteProps} children={<LoginView />} />
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute {...authRouteProps} children={<SignupView />} />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute {...protectedRouteProps} children={<HomeView />} />
        }
      />
    </Routes>
  );
}

export default App;
