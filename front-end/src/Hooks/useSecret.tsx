import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getSecret } from "../Api/User";
import useToken from "./useToken";
import { ApiErrorResponse } from "../Types/Response";

function useSecret(): UseQueryResult<string, ApiErrorResponse> {
  const { data } = useToken();

  return useQuery<string, ApiErrorResponse>(["secret"], {
    queryFn: () => getSecret(data?.accessToken ?? ""),
    keepPreviousData: true,
    enabled: false,
  });
}

export default useSecret;
