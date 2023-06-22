import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getNewAccessToken } from "../Api/User";
import { AccessToken } from "../Types/Data";
import { ApiErrorResponse } from "../Types/Response";

function useToken(): UseQueryResult<AccessToken, ApiErrorResponse> {
  const queryClient = useQueryClient();
  return useQuery<AccessToken, ApiErrorResponse>(["token"], {
    queryFn: getNewAccessToken,
    // enabled: false,
    keepPreviousData: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (_error) => {
      queryClient.setQueryData(["token"], null);
    },
  });
}

export default useToken;
