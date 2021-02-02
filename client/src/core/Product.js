import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Bigcarts from "./Bigcarts";


const Product = props => {
    const [product, setProduct] = useState({});
    const [setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);


            }
        });
    };
    const showLoading = () =>
        (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mb-1" style={{alignItems:"center"}}>
                        <h6 className="card-header mb-1"
                            style={{borderRadius:'5px',backgroundColor:'white',
                            fontSize:'16px',color:"black",borderBottom: '5px solid Gainsboro'}}>
                            {product.description && product.description.substr(0,40)}</h6>

                        {!product.description?showLoading():  product && product.description && <Bigcarts product={product} showViewProductButton={false} />}

                    </div>


                    <div className="col-sm-6">


                        <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                            borderBottom: '5px solid Gainsboro'}}>
                            <span style={{fontSize:'15px',fontWeight:"bold",textAlign:"center",
                               }}>Description</span>

                        </p>
                        <p className="card-header mb-2"
                           style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",whiteSpace:"pre-line",
                               borderBottom: '5px solid Gainsboro'
                           }}>

                            {!product.description?showLoading():  product && product.description }

                        </p>

                      
                        <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                            borderBottom: '5px solid Gainsboro'}}>
                            <span style={{fontSize:'15px',fontWeight:"bold",textAlign:"center",
                            }}>Specifications</span>

                        </p>


                        <p className="card-header mb-2"
                           style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",whiteSpace:"pre-line",
                               borderBottom: '5px solid Gainsboro'
                           }}>

                            {  product && product.specification }

                        </p>



                        <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                            borderBottom: '5px solid Gainsboro'}}>
                            <span style={{fontSize:'15px',fontWeight:"bold",textAlign:"center",
                            }}>More Information</span>

                        </p>


                        <p className="card-header mb-2"
                           style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",whiteSpace:"pre-line",
                               borderBottom: '5px solid Gainsboro'
                           }}>

                            {  product && product.moreinfo }

                        </p>

                            


                            <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                                borderBottom: '5px solid Gainsboro'}}>
                                <span style={{fontSize:'15px',fontWeight:"bold"}}>Delivery: </span>
                                Free Home delivery <i
                                className='fas fa-truck' style={{fontSize:'20px'}}></i></p>

                            <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                                borderBottom: '5px solid Gainsboro'}}>
                                <span style={{fontSize:'15px',fontWeight:"bold"}}>Payment: </span> Cash on Delivery <i
                                className='fas fa-money' style={{fontSize:'20px'}}></i></p>



                        <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                            borderBottom: '5px solid Gainsboro', }}>
                            <span style={{fontSize:'15px',fontWeight:"bold"}}>Order on Call: </span>  <a href="tel:9869756354">
                                <span>9869756354</span> </a>  <i
                            className='fas fa-phone' style={{fontSize:'20px'}}></i></p>

                            <p className="card-header mb-2" style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",

                                borderBottom: '5px solid Gainsboro'}}>
                                <span style={{fontSize:'15px',fontWeight:"bold",textAlign:"center",
                                  }}>Questions & answers about the products</span>
                                <i className='fas fa-star' style={{fontSize:'20px',color:"green"}}></i>
                            </p>
                        <p className="card-header mb-2"
                           style={{borderRadius:'5px',backgroundColor:"white",fontSize:'14px',color:"black",whiteSpace:"pre-line",
                               borderBottom: '5px solid Gainsboro'}}>

                            { product && product.questions }


                        </p>





                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;
