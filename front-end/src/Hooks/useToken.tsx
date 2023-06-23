import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getNewAccessToken } from "../Api/User";
import { AccessToken } from "../Types/Data";
import { ApiErrorResponse } from "../Types/Response";

function useToken(): UseQueryResult<AccessToken, ApiErrorResponse> {
  return useQuery<AccessToken, ApiErrorResponse>(["token"], {
    queryFn: getNewAccessToken,
    keepPreviousData: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useToken;
