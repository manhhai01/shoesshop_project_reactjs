import React from "react";

const FooterComponent = () => {
  return (
    <div style={{ minHeight: 200, backgroundColor: "white" }}>
      <div style={{ minHeight: 150 }}>
        <div style={{marginLeft: 0, marginRight: 0}} className="row mt-5">
          <div
            style={{ borderRight: "1px solid black" }}
            className="col-4 d-flex flex-column align-items-center p-0"
          >
            <div>
              <h6>GET HELP</h6>
            </div>
            <div>Home</div>
            <div>Nike</div>
            <div>Adidas</div>
            <div>Contact</div>
          </div>
          <div
            style={{ borderRight: "1px solid black" }}
            className="col-4 d-flex flex-column align-items-center p-0"
          >
            <div>
              <h6>SUPPORT</h6>
            </div>
            <div>About</div>
            <div>Contact</div>
            <div>Help</div>
            <div>Phone</div>
          </div>
          <div className="col-4 d-flex flex-column align-items-center p-0">
            <div>
              <h6>REGISTER</h6>
            </div>
            <div>Register</div>
            <div>Login</div>
          </div>
        </div>
      </div>
      <div
        style={{ minHeight: 50, backgroundColor: "#D9D9D9" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <span>
            @ 2020 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
            Khải.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
