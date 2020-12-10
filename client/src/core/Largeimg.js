import React from "react";
const small={
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent: 'center'
}
const Largeimag = ({ item, url }) => (
    <div className="card shadow bg-white rounded" style={small} >
        <img className="card-img-top " src={`/api/${url}/photo/${item._id}`} alt="Card image cap"/>
    </div>
);

export default Largeimag;
