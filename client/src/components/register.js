import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import reg from "../images/register.svg";
import Alert from "./Alert";
import "./form_content.css";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  age: yup
    .number()
    .required("Age required")
    .min(13, "To use Guftaar, you must be 13+"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup
    .string()
    .required("Password required")
    .matches(
      /^(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long, with a number."
    ),
});

function Register() {
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
      .post("http://localhost:4000/client/register", data, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      })
      .then((response) => {
        if (
          response.data === "We already have an account made with this email"
        ) {
          setAlert({ type: "error", message: "Email already in use" });
        } else {
          setAlert({ type: "success", message: "Account Created!" });
          setTimeout(() => {
            navigate("/client/login");
          }, 1000);
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
        <div className="main-container">
          <div className="img-container">
            <h1 className="welcome-heading">Welcome to Guftaar</h1>
            <img src={reg} className="reg-img" alt="register" />
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <label htmlFor="fname">First name</label>
              <input
                {...register("firstName")}
                className={`input-field ${
                  errors.firstName ? "error-control" : ""
                }`}
                placeholder="Enter your name"
                id="fname"
                name="firstName"
              />
              <span className="et">{errors.firstName?.message}</span>

              <label htmlFor="lname">Last name</label>
              <input
                {...register("lastName")}
                className={`input-field ${
                  errors.lastName ? "error-control" : ""
                }`}
                placeholder="Enter your surname"
                id="lname"
                name="lastName"
              />
              <span className="et">{errors.lastName?.message}</span>

              <label htmlFor="age">Age</label>
              <input
                {...register("age")}
                className={`input-field ${errors.age ? "error-control" : ""}`}
                placeholder="Enter your age"
                id="age"
                name="age"
                type="number"
              />
              <span className="et">{errors.age?.message}</span>

              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                className={`input-field ${errors.email ? "error-control" : ""}`}
                placeholder="Enter your email"
                id="email"
                name="email"
                type="email"
              />
              <span className="et">{errors.email?.message}</span>

              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                className={`input-field ${
                  errors.password ? "error-control" : ""
                }`}
                placeholder="Enter password"
                id="password"
                name="password"
                type="password"
              />
              <span className="et">{errors.password?.message}</span>

              <button type="submit" className="buttonL">
                Register
              </button>
              <button
                type="button"
                className="form-button"
                onClick={() => navigate("/client/login")}
              >
                Already have an account? Login here
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
