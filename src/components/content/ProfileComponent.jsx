import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  convertDate,
} from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateProfileActionApi } from "../../redux/reducers/userReducer";
import { Pagination } from "antd";

const ProfileComponent = () => {
  const { userProfile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: userProfile.email,
      password: userProfile.password || "",
      name: userProfile.name,
      phone: userProfile.phone,
      gender: userProfile.gender,
    }, // giá trị của form, value của các trường input
    onSubmit: (values) => {
      console.log("values", values);
      const actionAsync = getUpdateProfileActionApi(values);
      dispatch(actionAsync)
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

  

  const pageSize = 2;

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = userProfile.ordersHistory.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const renderOrderDetail = (orderDetail) => {
    return orderDetail?.map((itemCart, index) => {
      return <tr key={index}>
      <th style={{ verticalAlign: "middle" }} scope="row"></th>
      <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
      <td style={{ verticalAlign: "middle" }}>
        <img
          style={{ width: 60, height: 60 }}
          src={itemCart.image}
          alt=""
        />
      </td>
      <td style={{ verticalAlign: "middle" }}>{itemCart.name}</td>
      <td style={{ verticalAlign: "middle" }}>{itemCart.price}</td>
      <td style={{ verticalAlign: "middle" }}>
        <span>{itemCart.quantity}</span>
      </td>
      <td style={{ verticalAlign: "middle" }}>{itemCart.price * itemCart.quantity}</td>
    </tr>
    })
  }

  const renderOrdersHistory = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return userProfile.ordersHistory.slice(startIndex, endIndex)?.map((item, index) => {
      return <div key={index} className="mt-5">
      <span style={{ color: "#7D0DB1", fontSize: 16 }}>
        + Orders have been placed on {convertDate(item.date)}
      </span>
      <table className="table table table-striped table-hover mt-2">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">image</th>
            <th scope="col">name</th>
            <th scope="col">price</th>
            <th scope="col">quantity</th>
            <th scope="col">total</th>
          </tr>
        </thead>
        <tbody>
          {renderOrderDetail(item.orderDetail)}
        </tbody>
      </table>
    </div>
    })
  }

  return (
    <>
      <div
        className="mt-3 text-white d-flex align-items-center"
        style={{
          width: "45%",
          height: 50,
          background: "linear-gradient(to bottom, #F21299, #1B02B5)",
          fontSize: 30,
          padding: 30,
          fontWeight: 300,
        }}
      >
        <span>Profile</span>
      </div>
      <div className="container-fluid">
        <form action="" onSubmit={frm.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <div
                style={{ height: "100%" }}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={userProfile.avatar}
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
            <div className="col-4 mt-5">
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
                    value={frm.values.email}
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
                    value={frm.values.password}
                    onChange={frm.handleChange}
                  />
                </div>
                {frm.errors.password && (
                  <p className="text-danger">{frm.errors.password}</p>
                )}
              </div>
            </div>
            <div className="col-4 mt-5">
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
                    value={frm.values.name}
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
                    value={frm.values.phone}
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
                  style={{
                    borderRadius: 20,
                    width: 120,
                    backgroundColor: "#6200EE",
                  }}
                  className="btn text-white"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div style={{ minHeight: 500 }} className="container">
        <hr />
        <h3 style={{ color: "#DD2AED", fontWeight: 300 }}>Order history</h3>
        {renderOrdersHistory()}
        <div className="d-flex justify-content-center align-items-center">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
      </div>
    </>
  );
};

export default ProfileComponent;
