import axios from "axios";
import { ApiResponse } from "../Types/Response";
import { LoginRequest, SignUpRequest } from "../Types/Request";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const signup = (user: SignUpRequest) => {
  return axios
    .post<ApiResponse>(`/auth/signup`, user)
    .then((res) => res.data.msg);
};

const login = (user: LoginRequest) => {
  return axios
    .post<ApiResponse>(`/auth/login`, user)
    .then((res) => res.data.msg);
};

const getDetail = (token: string | null | undefined) => {
  return axios
    .get<ApiResponse>("/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.msg);
};

const getNewAccessToken = () => {
  console.log("Fetch new token");
  return axios.post<ApiResponse>(`/auth/refresh`).then((res) => res.data.msg);
};

const getSecret = (token: string) => {
  return axios
    .get<ApiResponse>("/secret", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.msg);
};

const logout = () => {
  return axios.post<ApiResponse>("/auth/logout").then((res) => res.data.msg);
};

export { signup, login, getNewAccessToken, getDetail, getSecret, logout };
