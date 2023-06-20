import { toast } from "react-toastify";
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
  ValidationError,
} from "../Types/Response";
import { FormikHelpers } from "formik";

export const mutationErrorHandler = <T>(
  error: ApiErrorResponse | ApiValidationErrorResponse,
  formikHelpers: FormikHelpers<T>
) => {
  const msg = error.response?.data.msg;
  if (typeof msg === "string") {
    toast(msg, {
      autoClose: 7000,
      position: "top-center",
    });
  } else {
    let errors = msg as ValidationError[];
    for (let error of errors)
      formikHelpers.setFieldError(error.path, error.message);
  }
};
