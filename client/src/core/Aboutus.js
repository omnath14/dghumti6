import React from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import Menu from "./Menu";
import Footer from "./Footer";


const small={
    backgroundColor:"#F6F5F2" ,
    color:"white",
    fontFamily:"Arial Unicode MS"
}
const s={
    marginLeft:'20px'
}

const Aboutus = () => (
    <div >
        <Menu/>
        <div className="container">

                <div className="container">
                    <h5>About us</h5>
                    <hr/>
                    <p>
                Dghumti is a user-friendly Web Application designed for the purpose of easy deliverance of goods and services to customers.
                        Dghumti allows its user to access the digitized form of a market by enabling them to purchase daily necessary items,
                        from the comfort of their own home via online. We also take your orders through phone calls and deliver your product to you.
                        When it comes about shopping,
                        we try our best to reduce your effort to minimum and save your time to maximum.

                    </p>


                </div>

        </div>
       <Footer/>

    </div>

);

export default Aboutus;
