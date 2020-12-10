import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import Orderimage from "./Orderimage";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h5 className="text">Total orders: {orders.length}</h5>

            );
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly/> </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };
    const scrolldown = () => {
        return (
            (

                <button   onClick={scrollTop}   className="btn btn-primary " style={{marginLeft:'5%'}}>Click to Scroll down</button>
            )
        );
    };
    const scrollTop = () =>{
        window.scrollTo({ top: 100000, behavior: 'smooth'});
    };
    const scrolltop = () => {
        return (
            (

                <button   onClick={scrollTops}   className="btn btn-primary " style={{marginLeft:'5%'}}>Click to Scroll Top</button>
            )
        );
    };
    const scrollTops = () =>{
        window.scrollTo({ top: 0, behavior: 'smooth'});
    };
    const showStatus = o => (
        <div className="form-group">
            <h5 className="mark mb-4">Status: {o.status}</h5>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout>
            <div className="container">
                {scrolldown()}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    {orders.map((o, oIndex) => {
                        return (
                            <div >
                                <div className="alert alert-info" role="alert" style={{padding: "20px", border: "3px solid blue"}}>
                                       <h6 className="text-danger">Order ID: {o._id}</h6>
                                </div>

                                <ul className="list-group mb-2"  >
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
 
                                  <li className="list-group-item">
                                        Payment: {"cash on delivery"}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: Rs {o.amount}
                                    </li>

                                    <li className="list-group-item">
                                        Ordered time:{" "}{moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Name: {o.address}
                                    </li>
                                    <li className="list-group-item">
                                        Phone number: {o.phone}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.exactaddress}
                                    </li>
                                </ul>

                                <h6>
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h6>
<div style={{padding: "20px", border: "3px solid red"}}>
                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} >

                                        {showInput("Product Id", p._id)}
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price*p.count)}
                                        {showInput("Product Quantity", p.count)}
                                        <h6>Product image</h6>
                                        <Orderimage item={p} url="product" />


                                    <hr  />

                                    </div>
                                ))}
</div>
                            </div>
                        );
                    })}
                </div>
            </div>
                {scrolltop()}
            </div>

        </Layout>
    );
};

export default Orders;
