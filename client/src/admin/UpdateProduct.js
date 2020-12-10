import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {  Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        cprice: '',
        off:'',
        categories: [],
        specification:'',
        moreinfo:'',
        category: '',
        shipping: '',
        questions:'',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        specification,
        moreinfo,
        price,
        cprice,
        off,
        questions,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    specification: data.specification,
                    moreinfo: data.moreinfo,
                    questions: data.questions,
                    price:    data.price,
                    cprice:   data.cprice,
                    off:       data.off,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });

                initCategories();
            }
        });
    };


    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    specification: ' ',
                    moreinfo: ' ',
                    questions: '',
                    photo: '',
                    price: '',
                    cprice:'',
                    off:'',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo (required)</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name (required)</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description (required)</label>
                <textarea onChange={handleChange('description')} className="form-control"  style={{height:"300px",width:"100%"}} value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Specifications </label>
                <textarea onChange={handleChange('specification')} className="form-control"  style={{height:"300px",width:"100%"}} value={specification} />
            </div>

            <div className="form-group">
                <label className="text-muted">More Information</label>
                <textarea onChange={handleChange('moreinfo')} className="form-control"  style={{height:"300px",width:"100%"}} value={moreinfo} />
            </div>

            <div className="form-group">
                <label className="text-muted">Questions and Answers about the products</label>
                <textarea onChange={handleChange('questions')} className="form-control"  style={{height:"200px",width:"100%"}} value={questions} />
            </div>

            <div className="form-group">
                <label className="text-muted">Our Price (required)</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Market Price</label>
                <input onChange={handleChange('cprice')} type="number" className="form-control" value={cprice} />
            </div>

            <div className="form-group">
                <label className="text-muted">Percent off</label>
                <input onChange={handleChange('off')} type="number" className="form-control" value={off} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category (required)</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>





            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout >
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
