import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseApi } from "../baseAPI";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { state } = useLocation();

  const [error, setError] = useState({
    show: false,
    message: "Incorrect email or password.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await baseApi.post("auth/login", formData);

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/user-management");
    } catch (error) {
      setError({
        show: true,
        message: "Incorrect email or password.",
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mt-3">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="mt-3">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <Link to="/register" className="btn btn-primary mt-3 ms-3">
          Register
        </Link>
      </form>

      {error.show && (
        <p className="mt-3 text-danger">{error.show ? error.message : ""}</p>
      )}

      {state?.isBlocked && (
        <p className="mt-3 text-danger">sorry you are blocked</p>
      )}
    </div>
  );
};

export default Login;
