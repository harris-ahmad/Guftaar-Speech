import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Si from "../images/sign_in.svg";
import Alert from "./Alert";
import "./form_content.css";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

function Login() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/client/login", data)
      .then((res) => {
        if (res.data.error) {
          setAlert({ type: "error", message: "Invalid Credentials" });
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("email", res.data.email);
          window.location = "/client/dashboard";
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: "Something went wrong!" });
      });
  };

  return (
    <>
      {alert.type && <Alert type={alert.type} message={alert.message} />}
      <div className="client-bg">
        <div className="form-content-login">
          <h2>Login</h2>
          <img id="login" src={Si} alt="signin" />
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              className={`input ${errors.email ? "error-control" : ""}`}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
            />
            <span id="error-text">{errors.email?.message}</span>

            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              className={`input ${errors.password ? "error-control" : ""}`}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
            />
            <span id="error-text">{errors.password?.message}</span>

            <button type="submit" className="buttonL">Log In</button>
          </form>
          <button className="form-buttonl" onClick={() => navigate("/client/register")}>
            New to Guftaar? Register here.
          </button>
          <button className="form-buttonl" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
