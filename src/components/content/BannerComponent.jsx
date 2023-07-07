import React, { useEffect } from "react";
import { Carousel } from "antd";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProductsActionApi } from "../../redux/reducers/productReducer";

const BannerComponent = () => {
  const { products } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsApiFunction();
  }, []);

  const getProductsApiFunction = async () => {
    const actionAsync = getProductsActionApi();
    dispatch(actionAsync);
  };

  const dotStyle = {
    backgroundColor: "red", // Màu sắc của điểm chỉ số
  };

  const renderBanners = () => {
    return products.slice(0, 10).map((product) => {
      return (
        <div key={product.id}>
          <Row>
            <Col
              span={14}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={product.image}
                alt={product.shortDescription}
                style={{ width: "500px", height: "450px" }}
                className="slick-image-fit"
              />
            </Col>
            <Col
              span={10}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="container">
                <h5>{product.name}</h5>
                <p>{product.shortDescription}</p>
                <button
                  style={{ color: "#F8B653" }}
                  className="btn btn-warning text-white"
                >
                  Buy now
                </button>
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  };

  return (
    <Carousel style={{marginTop: 140}} autoplay dotStyle={dotStyle}>
      {renderBanners()}
    </Carousel>
  );
};

export default BannerComponent;
