import { LoginRequest } from "../Types/Request";
import { Formik, FormikHelpers } from "formik";
import "../Styles/Form.scss";
import loginSchema from "../Validation/Login";
import FormField from "../Components/Form/FormField";
import useLogin from "../Hooks/useLogin";
import { mutationErrorHandler } from "../utils/ErrorHandler";
import { useNavigate, Link } from "react-router-dom";

function LoginView() {
  const values: LoginRequest = {
    email: "",
    password: "",
  };

  const valueTypes: LoginRequest = {
    email: "text",
    password: "password",
  };

  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();

  const submitHandler = (
    values: LoginRequest,
    formikHelpers: FormikHelpers<LoginRequest>
  ) => {
    mutate(values, {
      onSettled: () => {
        formikHelpers.setSubmitting(false);
      },
      onError: (error) => mutationErrorHandler(error, formikHelpers),
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <div className="container">
      <div className="form border rounded p-4">
        <h1>Login</h1>
        <Formik
          initialValues={values}
          onSubmit={submitHandler}
          validationSchema={loginSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {(Object.keys(values) as Array<keyof LoginRequest>).map(
                (field) => (
                  <FormField
                    fieldName={field}
                    formik={formik}
                    isLoading={formik.isSubmitting || isLoading}
                    type={valueTypes[field]}
                    key={field}
                  />
                )
              )}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
              <div className="dropdown-divider"></div>
              <p className="mt-3 text-center">
                Do not have an account? <Link to="/signup">Signup</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginView;
