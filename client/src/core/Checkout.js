import React, { useState} from 'react';
import { createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
 




const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: '',
        phone:'',
        exactaddress:''
    });

    let deliveryAddress = data.address;
    let phonenumber = data.phone;
    let mainaddress = data.exactaddress;


 let userIds;
 

    const handleAddress = event => {
        setData({ ...data, address: event.target.value,
        })};

    const handlePhone = event => {
        setData({ ...data, phone: event.target.value,
        })};
    const handleexact = event => {
        setData({ ...data, exactaddress: event.target.value,
        })};






    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            Please fill up the following details.
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' ,border:'1px solid #008ECC',borderRadius:'10px'}}>
            Thank You! Your order was successful.we will deliver to you soon.
        </div>
    );

    const showLoading = loading => loading && <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>



    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

   const showCheckout = () => {
        return  (
            getTotal()>=49 ?( <div>{delivarydetails()}</div>):(
                <div >
                    
                </div>
            )


        )
    };
 


    const buy = (e) => {
e.preventDefault()

        setData({ loading: true,success: true});

        const createOrderData = {products: products, amount: getTotal(products), address: deliveryAddress, phone:phonenumber, exactaddress: mainaddress};

                        createOrder(userIds,  createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run);
                                    setData({loading: false, success: true});
                                });
                            })


    };




    const delivarydetails = () => (

            <div onBlur={() => setData({ ...data, error: " " })}>
            { products.length > 0 ? (
                <form onSubmit={buy} >

                    <div className="form-group">
                        <h6>Name</h6>
                        <input onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                               style={{border:'1px solid #008ECC',borderRadius:'5px'}}
                            placeholder="Name" required />

                    </div>

                    <div className="form-group">
                        <h6>Phone number</h6>
                    <input
                            onChange={handlePhone}
                            className="form-control"
                            type="number"
                            value={data.phone}
                            placeholder="Phone number"
                            style={{border:'1px solid #008ECC',borderRadius:'5px'}}
                            required />
                       
                    </div>

                    <div className="form-group" >
                         <h6>Delivery address</h6>
                        <textarea
                            onChange={handleexact}
                            className="form-control"
                            value={data.exactaddress}
                            placeholder="Delivery address" style={{border:'1px solid #008ECC',borderRadius:'5px'}}
                            required />
                          <small className="text-muted">Eg. chandrapur bazar near jan jyoti school</small>
                    </div>

                    <button style={{backgroundColor:'#008ECC',color:"white"}} className="btn btn-block">Buy</button>
                </form>) :

                null}


        </div>)




    return (
        <div>
            <div className="alert alert-info mt-3" style={{border:'1px solid #008ECC',borderRadius:'10px'}}>
                <h6> Payment method: Cash on delivery </h6>
            </div>
            {
                !data.success &&
            <h5>Total Amount: Rs { getTotal()}</h5>
            }
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
