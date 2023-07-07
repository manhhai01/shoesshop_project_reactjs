import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsActionApi } from "../../redux/reducers/productReducer";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";

const backgroundStyleColor = {
  background: "linear-gradient(to bottom, #F21299, #1B02B5)",
};

const pageSize = 8;

const ProductFeature = () => {
  const { products } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsApiFunction();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = products.length;

  const getProductsApiFunction = async () => {
    const actionAsync = getProductsActionApi();
    dispatch(actionAsync);
  };

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex).map((product) => {
      return (
        <div key={product.id} className="col-3">
          <div className="card">
            <NavLink to={`/detail/${product.id}`}>
              <img
                className="w-100"
                src={product.image}
                alt={product.shortDescription}
              />
            </NavLink>
            <div className="card-body">
              <h6>{product.name}</h6>
              <p>{product.shortDescription}</p>
            </div>
            <div className="card-footer p-0">
              <div className="row">
                <div className="col-6">
                  <NavLink to={`/detail/${product.id}`}>
                    <button
                      style={{
                        backgroundColor: "#9DE167",
                        border: "none",
                        borderRadius: "0px",
                      }}
                      className="btn btn-success w-100"
                    >
                      Buy now
                    </button>
                  </NavLink>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center p-0">
                  <b>{product.price}$</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5">
      <div style={backgroundStyleColor} className="w-50">
        <h5 style={{ padding: "10px 20px" }} className="text-white">
          Product Feature
        </h5>
      </div>
      <div className="container my-5">
        <div className="row g-5">{renderProducts()}</div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductFeature;
