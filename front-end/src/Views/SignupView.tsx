import "../Styles/Form.scss";
import { SignUpRequest } from "../Types/Request";
import { Formik, FormikHelpers } from "formik";
import FormField from "../Components/Form/FormField";
import useSignup from "../Hooks/useSignup";
import signupSchema from "../Validation/Signup";
import { mutationErrorHandler } from "../utils/ErrorHandler";
import { useNavigate, Link } from "react-router-dom";

function SignupView() {
  const values: SignUpRequest = {
    email: "",
    name: "",
    password: "",
  };

  const valueTypes: SignUpRequest = {
    email: "email",
    name: "text",
    password: "password",
  };

  const { mutate, isLoading } = useSignup();
  const navigate = useNavigate();

  const submitHandler = (
    values: SignUpRequest,
    formikHelpers: FormikHelpers<SignUpRequest>
  ) => {
    mutate(values, {
      onError: (error) => mutationErrorHandler(error, formikHelpers),
      onSettled: () => {
        formikHelpers.setSubmitting(false);
      },
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <div className="container">
      <div className="form border rounded p-4">
        <h1>Sign Up</h1>
        <Formik
          initialValues={values}
          validationSchema={signupSchema}
          onSubmit={submitHandler}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {(Object.keys(values) as Array<keyof SignUpRequest>).map(
                (field) => (
                  <FormField
                    fieldName={field}
                    formik={formik}
                    key={field}
                    isLoading={formik.isSubmitting || isLoading}
                    type={valueTypes[field]}
                  />
                )
              )}
              <button
                disabled={isLoading || formik.isSubmitting}
                type="submit"
                className="btn btn-primary w-100 mt-3"
              >
                Signup
              </button>
              <div className="dropdown-divider"></div>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignupView;
