import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(2, "Password must be at least 2 characters")
    .required("Password is required"),
});
