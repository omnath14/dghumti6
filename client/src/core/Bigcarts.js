import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem, updateItem, removeItem } from './cartHelpers';
import Largeimag from "./Largeimg";

const Bigcarts= ({
                  product,

                  showAddToCartButton = true,
                  cartUpdate = false,
                  showRemoveProductButton = false,
                  setRun = f => f,
                  run = undefined

              }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };



    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <div style={{textAlign:'center'}}>
                    <button onClick={addToCart}  className="btn mb-4"
                            style={{borderRadius:'5px',padding:'5px',width:'120px', color:'white',backgroundColor:'#008ECC' }}>Buy Now</button>
                </div>
            )
        );
    };



    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 0 ? 0 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };
    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button onClick={() => {removeItem(product._id);setRun(!run);}}
                        className="btn btn-outline-danger"><small>Remove from cart</small>
                </button>
            )
        );
    };
    const small={
        width:'100%',
        border:'0.5px solid #008ECC'
    }


    return (

        <div  className="card " style={small}  >
            {shouldRedirect(redirect)}
            <Link to={`/product/${product._id}`}>
                <Largeimag item={product} url="product" />
            </Link>
            <span style={{ margin:'15px', fontWeight:'bold'}}>Rs. <span style={{fontSize:'25px'}}>{product.price}</span> <del style={{fontSize:'15px',color:"#999999"}}>{product.cprice}</del>
                {"    "}
{
    /*
    <span style={{fontSize:'13px',color:'#4BB543'}}>{product.off}% off</span>
    */
}



            </span>

            <small className="text-center mb-3">{product.description.substring(0, 20)}</small>
            {showCartUpdateOptions(cartUpdate)}
            {showRemoveButton(showRemoveProductButton)}
            {showAddToCartBtn(showAddToCartButton)}
        </div>



    );
};

export default Bigcarts;

