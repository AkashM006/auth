import { Routes, Route } from "react-router-dom";
import LoginView from "./Views/LoginView";
import SignupView from "./Views/SignupView";
import HomeView from "./Views/HomeView";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./Components/ProtectedRoute";

function App() {
  const protectedRouteProps: Omit<ProtectedRouteProps, "children"> = {
    isAllowed: false,
    redirectPath: "/login",
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<SignupView />} />
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
