import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation<
    User,
    ApiErrorResponse | ApiValidationErrorResponse,
    LoginRequest
  >(login, {
    onSuccess: (data) => {
      const tokenData = { accessToken: data.accessToken };
      queryClient.setQueryData(["token"], tokenData);
      console.log("Data: ", data);
    },
  });
}

export default useLogin;
