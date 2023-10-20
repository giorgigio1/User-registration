import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseApi } from "../baseAPI";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../validation/schema";

const Login: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const response = await baseApi.post("auth/login", values);
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/user-management");
          } catch (error) {
            setFieldError("password", "Incorrect email or password.");
            console.error("Login error:", error);
          }
          setSubmitting(false);
        }}
        validationSchema={loginValidationSchema}
      >
        <Form>
          <div className="form-group">
            <label className="mt-3">Email</label>
            <Field type="email" className="form-control" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label className="mt-3">Password</label>
            <Field type="password" className="form-control" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-2">
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
          </div>
          <div>
            <Link to="/register">Create new account</Link>
          </div>
        </Form>
      </Formik>
      {state?.isBlocked && (
        <p className="mt-3 text-danger">Sorry, you are blocked</p>
      )}
    </div>
  );
};

export default Login;
