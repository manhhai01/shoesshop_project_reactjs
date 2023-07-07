import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX, USER_LOGIN } from "../../utils/config";
import {
  getloginActionApi,
  setUserLogin,
} from "../../redux/reducers/userReducer";

const FormLoginComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem(USER_LOGIN);
    const action = setUserLogin({});
    dispatch(action);
  }, []);

  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, // giá trị của form, value của các trường input
    onSubmit: (values) => {
      console.log("values", values);

      const actionAsync = getloginActionApi(values);

      dispatch(actionAsync);
    }, // khi submit()
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .matches(EMAIL_REGEX, "Email is not valid")
        .required("Email cannot be blank!"),

      //.matches(regex, "Loix")
      password: yup
        .string()
        // .matches(PASSWORD_REGEX, "Password is not valid")
        .required("Password cannot be blank!"),
    }),
  });
  return (
    <div className="container mt-5">
      <form action="" onSubmit={frm.handleSubmit}>
        <h3>Login</h3>
        <hr />
        <div className="mt-5 w-50 mx-auto">
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@gmail.com"
                onChange={frm.handleChange}
              />
            </div>
            {frm.errors.email && (
              <p className="text-danger">{frm.errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="password"
                onChange={frm.handleChange}
              />
            </div>
            {frm.errors.password && (
              <p className="text-danger">{frm.errors.password}</p>
            )}
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <div style={{ marginRight: 15 }}>
              <NavLink to={"/register"}>
                <span>Register now?</span>
              </NavLink>
            </div>
            <div>
              <button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#6200EE",
                  color: "white",
                }}
                className="btn"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
          <div>
            <button
              style={{ borderRadius: 15 }}
              className="btn btn-primary w-100 p-2 mt-3"
            >
              <i
                style={{ marginRight: 16, fontSize: 20 }}
                className="fa-brands fa-facebook"
              ></i>
              Continue with facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLoginComponent;
