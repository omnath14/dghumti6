import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import Menu from "./Menu";
import Footer from "./Footer";





const Termscondition = () => (
   <div >
     <Menu/>


                <div className="container">
                    <h5>Terms of use & return policy</h5>
                    <hr/>
                    <p>

                        1. You understand that Dghumti does not manufacture, store or inspect any of the items sold through our services.
                        We provide the venue for various products.
                        The items it our marketplace are produced, listed and sold by independent companies and stores so Dghumti cannot and does not make any warranty about their quality, safety and even their legality.
                        Any legal claim related to an item you purchased  must be brought directly against the producer/seller of the item. You release Dghumti from any claims related to items sold through through our service, including of defective items and misinterpretation by producer/seller
                    </p><br/>

                      <p> 2. All products are subject to availability and  we reserve the right to impose quantity limits on any order, to reject all part of an order and to discontinue products
                          without notice, even if you have already placed your order. Your placement of an order as a customer does not necessarily
                          assure that we will accept your order. We reserve the right to refuse any order in our sole discretion. Before accepting your order,
                          we may require additional information to complete your order. If you have not provided all the information required by us to complete your order,
                          disturbance may occur in the deliverance or we may not be able to deliver your order.</p><br/>

                      <p> 3. Dghumti cannot be held accountable for orders delayed to reasons beyond our control, including but not limited to the following:
                    Service strikes,
                    civil commotion, weather, natural disaster, fire, epidemics and failure of public or private telecommunication network
                      </p>


                        <p>4. You  are responsible for keeping your account and password secure. Dghumti cannot and will not be liable for any loss or damage
                            from your failure to maintain the security of your account and password.</p><br/>
                        <p>5.	Despite our best effort a small number of items in our catalogue may be mispriced.
                            We will verify pricing when processing with your order and before we take payments.
                            If we have made a mistake and product’s correct price is higher than the price of the website,
                            we may either contact you before dispatch, to request whether you want to buy the product at the correct price or cancel your order.
                            If a product’s price is lower than our stated price, we will charge the lower amount and change the product.</p> <br/>
                       <p> 6. We are always happy to accept returns as long as the item has not been damaged due to external factors from customers and
                           is returned with any tags securely attached with original and clear packaging(If possible but not essential).
                           further more we will be helping our customer for making sure about smooth functioning of an item as wanted.</p><br/>
                       <p> 7. Dghumti owns all intellectual property rights in the web site and in the   materials published on it .
                           These works are protected by laws worldwide. You shall not modify, translate, reverse engineer, decompile, disassemble or create
                           derivate works based on any software. You are not permitted to publish, manipulate, distribute or otherwise reproduce in any format.</p><br/>
                       <p> 8. We may update these terms from time to time, if we believe that the changes are material.
                           We will let you know by posting the changes through the service,
                           that way you can decide whether you want to continue using the services.
                           Changes will be effective upon the posting of the changes unless otherwise specified.
                           You are responsible for reviewing, and becoming familiar with any change.
                           Your use of the services following the changes constitute your acceptance of the updated terms.</p><br/>

                    <p><b>Note: We provide services subject to
                        notices, terms and conditions as set out above.By accessing,
                        browsing or shopping on this website, you agree to all the terms and
                        conditions in this agreement.
                        Please read them carefully.</b></p>
                </div>


        <Footer/>

   </div>

);

export default Termscondition;
