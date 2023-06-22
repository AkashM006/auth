import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getDetail } from "../Api/User";
import { User } from "../Types/Data";
import { ApiErrorResponse } from "../Types/Response";
import useToken from "./useToken";

function useUserDetail(): UseQueryResult<
  Omit<User, "accessToken">,
  ApiErrorResponse
> {
  const queryClient = useQueryClient();
  const { data } = useToken();

  return useQuery<Omit<User, "accessToken">, ApiErrorResponse>(["user"], {
    queryFn: () => getDetail(data?.accessToken),
    keepPreviousData: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (_error) => {
      queryClient.setQueryData(["user"], null);
    },
  });
}

export default useUserDetail;
