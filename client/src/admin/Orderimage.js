import React from "react";
const small={
    width:'150px',
    height:'150px'
}
const Orderimage = ({ item, url }) => (
    <div className="card shadow bg-white rounded" style={small} >
        <img className="card-img-top" src={`/api/${url}/photo/${item._id}`} alt="Card image cap"/>
    </div>
);

export default Orderimage;
