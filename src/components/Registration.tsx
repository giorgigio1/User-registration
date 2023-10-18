import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/auth/register",
      formData
    );
    const { token } = response.data;

    localStorage.setItem("token", token);

    navigate("/user-management");
  };

  return (
    <div className="container mt-5">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
          />
        </div>
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
          Register
        </button>
        <Link to="/login" className="btn btn-primary mt-3 ms-3">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Registration;
