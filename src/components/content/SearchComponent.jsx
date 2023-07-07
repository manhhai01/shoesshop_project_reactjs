import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { getProductSearchActionApi } from "../../redux/reducers/productReducer";

const SearchComponent = () => {
  const { productSearch } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  const keyWordRef = useRef("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy keyword từ url
  let keyword = searchParams.get("keyword");

  useEffect(() => {
    if (keyword !== null) {
      getProductSearchApiFunction();
    }
  }, [keyword]);

  const handleChange = (e) => {
    let { value } = e.target;
    keyWordRef.current = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Đưa keyword lên thanh url
    setSearchParams({
      keyword: keyWordRef.current,
    });
  };

  const getProductSearchApiFunction = async () => {
    const actionAsync = getProductSearchActionApi(keyword);
    dispatch(actionAsync);
  };

  const renderProductSearch = () => {
    return productSearch?.map((product) => {
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
    <>
      <div style={{ marginLeft: 50 }} className="mt-5">
        <form action="" onSubmit={handleSubmit}>
          <div className="search">
            <span style={{ fontSize: 20 }}>Search</span>
            <div className="d-flex mt-2">
              <input
                className="form-control w-25"
                type="text"
                placeholder="Product name ..."
                onChange={handleChange}
              />
              <button
                style={{
                  marginLeft: 10,
                  backgroundColor: "#6200EE",
                  color: "white",
                  width: 120,
                  borderRadius: 50,
                }}
                className="btn"
                type="submit"
              >
                SEARCH
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        style={{
          height: 74,
          background: "linear-gradient(to bottom, #F21299, #1B02B5)",
          color: "white",
          margin: "40px 0",
          fontSize: 30,
          paddingLeft: 50,
        }}
        className="search_result d-flex align-items-center"
      >
        <span>Search Result</span>
      </div>
      <div className="container">
        <div className="row g-5 my-2">{renderProductSearch()}</div>
      </div>
    </>
  );
};

export default SearchComponent;
