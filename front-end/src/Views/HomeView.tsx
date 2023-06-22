import useLogout from "../Hooks/useLogout";
import useSecret from "../Hooks/useSecret";
import useUserDetail from "../Hooks/useUserDetail";
import "../Styles/HomeView.scss";
import { toast } from "react-toastify";
import toastConfig from "../utils/ToastConfig";

function HomeView() {
  const { data } = useUserDetail();

  const { data: secret } = useSecret();

  const { mutate } = useLogout();

  const logoutHandler = () => {
    mutate(null, {
      onSuccess() {
        toast("User logged out successfully!", toastConfig);
      },
    });
  };

  return (
    <div className="h-100">
      <div className="container-fluid navbar-container bg-light d-flex justify-content-between align-items-center border-bottom">
        <h1 className="display-6 mr-auto">Auth</h1>
        <button onClick={logoutHandler} className="btn btn-outline-primary">
          Logout
        </button>
      </div>
      <div className="info-container d-flex justify-content-center align-items-center mx-auto">
        <div className="border rounded p-5">
          <h1 className="text-center">Welcome back {data?.name}!</h1>
          <div className="dropdown-divider"></div>
          <p className="text-center">Your secret message is: {secret}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
