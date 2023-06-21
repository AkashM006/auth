import axios from "axios";
import { ApiResponse } from "../Types/Response";
import { LoginRequest, SignUpRequest } from "../Types/Request";

axios.defaults.baseURL = "http://localhost:3000";

const signup = (user: SignUpRequest) => {
  return axios
    .post<ApiResponse>(`/auth/signup`, user, {
      withCredentials: true,
    })
    .then((res) => res.data.msg);
};

const login = (user: LoginRequest) => {
  return axios
    .post<ApiResponse>(`/auth/login`, user, {
      withCredentials: true,
    })
    .then((res) => res.data.msg);
};

const getNewAccessToken = () => {
  console.log("Requested refetch");
  return axios
    .post<ApiResponse>(
      `/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data.msg);
};

export { signup, login, getNewAccessToken };
