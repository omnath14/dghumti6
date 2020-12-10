import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    
    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h6 className="card-header mb-2" style={{border:'1px solid #008ECC',borderRadius:'10px'}}>Your cart has {items.length} items</h6>
                    <div className="alert alert-info" style={{border:'1px solid #008ECC',borderRadius:'10px'}}>
                    <h6 className="text-dark" >Minimum Order Amount Rs 49</h6>
                </div>
                <div className="row row-cols-2" >
                {items.map((product, i) => (
                    <div key={i} className="col-sm-4">
                    <Card product={product} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}/>
                    </div>
                ))}
                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
<div className="container">
     
     <hr/>


            <h6 className="card-header mb-2" style={{border:'1px solid #008ECC',borderRadius:'10px'}}>Your cart is empty.</h6>
<hr/>
            <Link to="/shop">
                <h6 className="card-header mb-2" style={{border:'1px solid #008ECC',borderRadius:'10px'}}>Continue shopping</h6>

            </Link>
            <hr/>

          
</div>

    );

    return (
        <Layout>
            <div className="container">
            <div className="row">
                <div className="col">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-sm-6">
                    <div className="container">
                        <Checkout  products={items} setRun={setRun} run={run} />
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default Cart;
