import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        specification:'',
        moreinfo:'',
        price: '',
        cprice:'',
        categories: [],
        category: '',
        questions:'',
        off:'',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        cprice,
        specification,
        moreinfo,
        questions,
        off,
        categories,
        loading,
        error,
        createdProduct,
        formData
    } = values;


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    specification:'',
                    moreinfo:'',
                    photo: '',
                    price: '',
                    questions:'',
                    off:'',
                    cprice: '',
                    loading: false,
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


            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h3>{`${createdProduct}`} is created successfully</h3>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout>
            <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
