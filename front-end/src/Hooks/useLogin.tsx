import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { User } from "../Types/Data";
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "../Types/Response";
import { LoginRequest } from "../Types/Request";
import { login } from "../Api/User";

function useLogin(): UseMutationResult<
  User,
  ApiErrorResponse | ApiValidationErrorResponse,
  LoginRequest
> {
  return useMutation<
    User,
    ApiErrorResponse | ApiValidationErrorResponse,
    LoginRequest
  >(login, {
    onSuccess: (data) => {
      // do something automatically
      console.log("Data: ", data);
    },
  });
}

export default useLogin;
