import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from "../../utils/config";
import { getRegisterActionApi } from "../../redux/reducers/userReducer";

const FormRegisterComponent = () => {
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      gender: "true",
    }, // giá trị của form, value của các trường input
    onSubmit: (values) => {
      console.log("values", values);

      const actionAsync = getRegisterActionApi(values);
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

      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password confirm không trùng khớp")
        .required("Password confirm cannot be blank!"),

      name: yup
        .string()
        .matches(NAME_REGEX, "Name is not valid")
        .required("Name cannot be blank!"),
      phone: yup
        .string()
        .matches(PHONE_REGEX, "Phone is not valid")
        .required("Phone cannot be blank!"),
    }),
  });

  return (
    <div className="container mt-5">
      <form action="" onSubmit={frm.handleSubmit}>
        <h3>Register</h3>
        <hr />
        <div className="row">
          <div className="col-6 mt-5">
            <div className="form-group">
              <div style={{ paddingRight: 200 }} className="mb-4">
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
              <div style={{ paddingRight: 200 }} className="mb-4">
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
            <div className="form-group">
              <div style={{ paddingRight: 200 }} className="mb-4">
                <label htmlFor="passwordConfirm" className="form-label">
                  <b>Password confirm</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="password confirm"
                  onChange={frm.handleChange}
                />
              </div>
              {frm.errors.passwordConfirm && (
                <p className="text-danger">{frm.errors.passwordConfirm}</p>
              )}
            </div>
          </div>
          <div className="col-6 mt-5">
            <div className="form-group">
              <div style={{ paddingRight: 200 }} className="mb-4">
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="your name"
                  onChange={frm.handleChange}
                />
              </div>
              {frm.errors.name && (
                <p className="text-danger">{frm.errors.name}</p>
              )}
            </div>
            <div className="form-group">
              <div style={{ paddingRight: 200 }} className="mb-4">
                <label htmlFor="phone" className="form-label">
                  <b>Phone</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="phone"
                  onChange={frm.handleChange}
                />
              </div>
              {frm.errors.phone && (
                <p className="text-danger">{frm.errors.phone}</p>
              )}
            </div>
            <div className="form-group">
              <div style={{ marginTop: 40 }} className="d-flex">
                <div>
                  <label htmlFor="phone" className="form-label">
                    <b>Gender</b>
                  </label>
                </div>
                <div
                  style={{ marginLeft: 30 }}
                  className="form-check d-flex flex-column align-items-center"
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    defaultChecked
                    value="true"
                    onChange={frm.handleChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div
                  style={{ marginLeft: 30 }}
                  className="form-check d-flex flex-column align-items-center"
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="false"
                    onChange={frm.handleChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                style={{ borderRadius: 20, width: 120 }}
                className="btn btn-primary"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegisterComponent;
