import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { logout } from "../Api/User";
import { ApiErrorResponse } from "../Types/Response";

function useLogout(): UseMutationResult<
  string,
  ApiErrorResponse,
  void | undefined | null
> {
  const queryClient = useQueryClient();

  return useMutation<string, ApiErrorResponse, void | undefined | null>(
    ["logout"],
    {
      mutationFn: logout,
      onSettled: () => {
        queryClient.setQueryData(["token"], { accessToken: "" });
        queryClient.setQueriesData(["user"], {});
      },
    }
  );
}

export default useLogout;
