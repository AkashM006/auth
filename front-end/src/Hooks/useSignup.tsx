import { UseMutationResult, useMutation } from "@tanstack/react-query";
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
  return useMutation<
    User,
    ApiErrorResponse | ApiValidationErrorResponse,
    SignUpRequest
  >(signup, {
    onSuccess: (data) => {
      // do something automatically
      console.log("data: ", data);
    },
  });
}

export default useSignup;
