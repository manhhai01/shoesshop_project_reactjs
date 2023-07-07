import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProductDetailActionApi } from "../../redux/reducers/productDetailReducer";
import { addCartsReducerAction } from "../../redux/reducers/cartsReducer";

const ProductDetail = () => {
  const location = useLocation();
  const { id } = useParams();

  const { productDetail } = useSelector((state) => state.productDetailReducer);

  console.log(productDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetailFuntion();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const getProductDetailFuntion = async () => {
    const actionAsync = getProductDetailActionApi(id);
    dispatch(actionAsync);
  };

  return (
    <div style={{ minHeight: 530 }}>
      <div className="row">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img
            style={{
              width: 340,
              height: 350,
              objectFit: "contain",
              backgroundColor: "#F8F8F8",
            }}
            src={productDetail.image}
            alt={productDetail.name}
          />
        </div>
        <div style={{ paddingLeft: 50 }} className="col-8">
          <h5>{productDetail.name}</h5>
          <p style={{ paddingRight: 100, marginTop: 20 }}>
            {productDetail.description}
          </p>
          <h6 style={{ color: "#1ED90E" }}>Availabe size</h6>
          <div className="d-flex">
            {productDetail.size?.map((size, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#CCCCCC",
                    marginRight: 15,
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  {size}
                </div>
              );
            })}
          </div>

          <h5
            style={{ color: "#FC0303", fontWeight: "700", margin: "15px 0px" }}
          >
            {productDetail.price}$
          </h5>
          <div className="d-flex align-items-center">
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(to bottom, #6181F3, #7C97F5)",
                marginRight: 15,
                fontSize: 30,
                color: "white",
                cursor: "pointer",
              }}
              className="d-flex justify-content-center align-items-center"
              onClick={handleIncrease}
            >
              +
            </div>
            <div>
              <b style={{ fontSize: 20, fontWeight: "500", marginRight: 15 }}>
                {quantity}
              </b>
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(to bottom, #6181F3, #7C97F5)",
                marginRight: 15,
                fontSize: 30,
                color: "white",
                cursor: "pointer",
              }}
              className="d-flex justify-content-center align-items-center"
              onClick={handleDecrease}
            >
              -
            </div>
          </div>
          <div
            className="d-flex justify-content-center align-items-center text-white fs-5"
            style={{
              width: 175,
              height: 64,
              background: "linear-gradient(to left, #3E20F8, #D017EE)",
              marginTop: 15,
              cursor: "pointer"
            }}
            onClick={() => {
              const { id, image, name, price } = productDetail;
              const payload = {
                id,
                image,
                name,
                price,
                quantity,
              };
              dispatch(addCartsReducerAction(payload));
            }}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
