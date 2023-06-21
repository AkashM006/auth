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
import { SignUpRequest } from "../Types/Request";
import { signup } from "../Api/User";

function useSignup(): UseMutationResult<
  User,
  ApiErrorResponse | ApiValidationErrorResponse,
  SignUpRequest
> {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    ApiErrorResponse | ApiValidationErrorResponse,
    SignUpRequest
  >(signup, {
    onSuccess: (data) => {
      const tokenData = { accessToken: data.accessToken };
      queryClient.setQueryData(["token"], tokenData);
      console.log("data: ", data);
    },
  });
}

export default useSignup;
