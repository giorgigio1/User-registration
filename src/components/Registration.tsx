import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseApi } from "../baseAPI";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { validationSchema } from "../validation/schema";

interface FormValuesType {
  username: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: FormValuesType,
    { setSubmitting }: FormikHelpers<FormValuesType>
  ) => {
    try {
      const response = await baseApi.post("auth/register", values);
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/user-management");
    } catch (error) {}
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h2>Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Username</label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage
                name="username"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label className="mt-3">Email</label>
              <Field type="email" className="form-control" name="email" />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label className="mt-3">Password</label>
              <Field type="text" className="form-control" name="password" />
              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="mb-2">
              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
            </div>
            <div>
              Go to <Link to="/login">Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
