import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
 





const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#0E81F3" };
    } else {
        return { color: "#000000" };
    }
};

const color={
    backgroundColor: '#008ECC',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
    borderBottom: '3px solid DODGERBLUE',
    borderRadius:'3px'


}
const l={
    width:'24%',
    height:'25%'
}


const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={color}>
        <div className="container">

             <h1>onlineshop</h1>
            
            <Link style={isActive(history, "/")}
                   to="/" >
                   <div style={{textAlign:'center'}}>
                
                    <span style={{color:"white"}} className='nav-links'>
                Home</span>
                   </div>
            </Link>

            <Link style={isActive(history, "/shop")}
                   to="/shop" >
                   <div style={{textAlign:'center'}}>
                    <span style={{color:"white"}} className='nav-links'>
                Category</span>
                   </div>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Link style={isActive(history, "/user/dashboard")}
                   to="/user/dashboard" >
                   <div style={{textAlign:'center'}}>
                <span style={{color:"white"}} className='nav-links'>
                Profile</span>
                   </div>
            </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Link style={isActive(history, "/admin/dashboard")}
                   to="/admin/dashboard" >
                   <div style={{textAlign:'center'}}>
                <span style={{color:"white"}} className='nav-links'>
                Admin</span>
                   </div>
            </Link>
            )}
                    {!isAuthenticated() && (
                    <Link
                        to="/signin" >
                        <div style={{textAlign:'center'}}>
                            <span style={{color:"white"}} className='nav-links'>
                Login</span>
                        </div>
                    </Link>
                )}



            <Link style={isActive(history, "/cart")}
                  to="/cart" >

                <div style={{textAlign:'center'}}>

                     <span style={{color:"white",backgroundColor:"red",borderRadius:'10px',width:'10px'}}> {itemTotal()}</span><br/>

                    <span style={{color:"white"}} className='nav-links'>
                Cart</span>


                </div>
            </Link>

        </div>

    </nav>


);

export default withRouter(Menu);
