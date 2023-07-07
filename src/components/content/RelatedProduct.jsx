import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailActionApi } from "../../redux/reducers/productDetailReducer";
import { NavLink } from "react-router-dom";

const RelatedProduct = () => {
  const { id } = useParams();

  const { productDetail } = useSelector((state) => state.productDetailReducer);

  console.log(productDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetailFuntion();
  }, [id]);

  const getProductDetailFuntion = async () => {
    const actionAsync = getProductDetailActionApi(id);
    dispatch(actionAsync);
  };

  const renderRelatedProducts = () => {
    return productDetail.relatedProducts?.map((product) => {
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

  return (
    <div className="container">
      <div className="text-center">
        <h4>- Related Product -</h4>
      </div>
      <div className="row g-5 my-2">{renderRelatedProducts()}</div>
    </div>
  );
};

export default RelatedProduct;
