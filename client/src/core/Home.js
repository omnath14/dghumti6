import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

import third from "./images/first.jpg";
import fourth from "./images/second.jpg";
import baby from "./images/baby.jpg";
import feminine from "./images/feminine.jpg";
import haircare from "./images/haircare.jpg";
import haircream from "./images/haircream.jpg";
import makeup from "./images/makeup.jpg";
import oralcare from "./images/oralcare.jpg";
import saving from "./images/saving.jpg";
import skincare from "./images/skincare.jpg";

import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
  }, []);

  const showLoading = () => (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container">
        {/* <div
          className="offers my-2"
          style={{ border: "1px solid #523906", borderRadius: "10px" }}
        >
          <div
            className="card-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h6 className="mb-0">Offers on Cake </h6>
            <div>
              <Link to="/shop">
                <small>View more</small>
              </Link>
            </div>
          </div>
          <div className="card-content mb-3">
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={third} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={fourth} alt="First slide" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div> */}
      </div>

      <div className=" container offers">
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "3px solid #523906",
            borderRadius: "13px",
          }}
        >
          <h6 className="mb-0">Products</h6>
          <div>
            <Link to="/shop">
              <small>View more</small>
            </Link>
          </div>
        </div>
        <div className=" my-2 ">
          {!productsBySell.length ? (
            showLoading()
          ) : (
            <div className="row row-cols-2">
              {productsBySell.map((product, i) => (
                <div key={i} className="col col-lg-2">
                  <Card product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
