import React from 'react'
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";

const small={
    backgroundColor:"#F6F5F2" ,
    color:"white",
}
const s={
    marginLeft:'20px'
}
const i={
    fontSize:'17px',
    color:'red',
    marginRight:'10px',
}

const Footer = () => {
    return (
        <footer className="text-center pb-4" style={small}>
            <div className="container">
                <ul className="list-styled list-inline text-center py-3 ">
                    <li className="list-inline-item">
                        <Link to="/contactus"> <small className="mb-1" style={s}> Contact us</small></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/terms&condition"> <small className="mb-1" style={s}>Terms of use & return policy</small></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/aboutus"> <small className="mb-0" style={s}>About us</small></Link>
                    </li>
                </ul>

                <div className='mb-3'>
                    <a className="mb-0 text-dark" ><i className="fa fa-map-marker" style={i}> </i>
                        <small style={{color:'red'}}>Address:</small> <small>Chandrapur-4, Rautahat Nepal</small> </a>
                    <br/>
                    <i className="fa fa-phone" style={i}></i>
                    <small style={{color:'red'}}> Phone: </small>
                    <small className='text-dark'>Ntc: </small> <a href="tel:9845560461">
                    <small>9845560461</small> </a> {' , '}
                    <small className='text-dark'>Ncell: </small>  <a href="tel:9813390991">
                    <small>9813390991</small></a>
                </div>
        
            </div>
            <small className="text-center text-dark">Copyright © Dghumti 2020.All rights reserved
            </small>
        </footer>
    )
}

export default Footer
