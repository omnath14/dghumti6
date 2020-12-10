import React from "react";


import Menu from "./Menu";
import Footer from "./Footer";



const Contactus = () => (
    <div >
        <Menu/>
        <div className="container">

            <div className="container">
                <h5>Contact us</h5>
                <hr/>
                <p>

                    <h6>Ncell: 9813390991</h6>
                    <h6>Ntc: 9845560461</h6>
                    <h6>Email:<a href="mailto:dghumti@gmail.com"> dghumti@gmail.com</a></h6><b/>
                    <h6>Website: <a href="https://www.dghumti.com/">www.dghumti.com</a></h6><b/>
                    <p>To Sell your product on Dghumti.com contact number:<a href="tel:9845560461">
                        <span> 9845560461</span></a></p>

                </p>

            </div>
        </div>

        <Footer/>

    </div>

);

export default Contactus;
