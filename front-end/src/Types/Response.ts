import { AxiosError, AxiosResponse } from "axios";

type Status = "SUCCESS" | "FAILED";

export interface ApiResponse<T = any> {
  msg: T;
  status: Status;
}

export type ValidationError = {
  path: string;
  message: string;
};

export type ApiSuccessResponse<T> = AxiosResponse<ApiResponse<T>>;

export type ApiErrorResponse = AxiosError<ApiResponse<String>>;

export type ApiValidationErrorResponse = AxiosError<
  ApiResponse<ValidationError[]>
>;
