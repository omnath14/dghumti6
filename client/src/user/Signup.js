import React, { useState } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false,
    });

    const { name, email, password, success, error,loading } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false,loading: true  });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false,loading: true });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true,
                    loading: false

                });
            }
        });
    };

    const showLoading = () =>
        loading && (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />

            </div>

            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                <small className="text-muted">Eg. om@gmail.com</small>
            </div>

            <div className="form-group">
                <label className="text">Password</label>
                <input onChange={handleChange('password')} type="text" className="form-control" value={password} />
                <small className="text-muted">Password must be 5 length long</small>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => {

        if (success) {
            return <Redirect to="/signin"/>;
        }
    }

    return (
        <Layout>
            <div className="container">
                <h5 className="mb-3">Create New Account</h5>
                {showLoading()}
            {showSuccess()}
            {showError()}
            {signUpForm()}
            </div>
        </Layout>
    );
};

export default Signup;
