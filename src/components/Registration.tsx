import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseApi } from "../baseAPI";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../validation/schema";
import { AxiosError } from "axios";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Registration</h2>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const response = await baseApi.post("auth/register", values);
            const { token } = response.data;

            localStorage.setItem("token", token);
            navigate("/user-management");
          } catch (error) {
            if (error instanceof AxiosError) {
              setFieldError("email", error.response?.data.message);
            }
            console.error(error);
          }
          setSubmitting(false);
        }}
        validationSchema={registerValidationSchema}
      >
        <Form>
          <div className="form-group">
            <label>Name</label>
            <Field type="text" name="fullname" className="form-control" />
            <ErrorMessage
              name="fullname"
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
            <Field type="password" className="form-control" name="password" />
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
      </Formik>
    </div>
  );
};

export default Registration;
