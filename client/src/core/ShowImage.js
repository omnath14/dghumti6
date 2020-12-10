import React from "react";
const small={
    height:'180px',
    display: 'flex',
     alignItems:'center',
     justifyContent: 'center'
}
const ShowImage = ({ item, url }) => (
    <div style={small} >
        <img className="card-img-top image-fix" src={`/api/${url}/photo/${item._id}`} alt="Card image cap"/>
    </div>
);

export default ShowImage;
