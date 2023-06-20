import * as yup from "yup";

const signupSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be atleast 3 characters long")
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only alphabets")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .trim()
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/,
      "Password must have at least one number, one special character, and one capital letter"
    )
    .required("Password is required"),
});

export default signupSchema;
