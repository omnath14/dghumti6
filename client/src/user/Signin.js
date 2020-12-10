import React, {useState} from "react";
import { Redirect ,Link} from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    placeholder="email"
                    className="form-control"
                    value={email}/>
            </div>

            <div className="form-group">
                <label className="text">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mb-1">
                Submit
            </button>
            <p> <Link to="/forgot-password" className="btn btn-raised btn-danger mb-0"> {" "}
                    Forgot Password
                </Link>
            </p>

        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/cart" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/shop" />;
        }
    };

    return (
        <Layout>
            <div className="container">
            <div className="alert alert-info">
                New User ? <Link to="/signup">Create New Account</Link>
            </div>
 
 


            </div>

            <div className="container">
                <h5 className="mb-1">Login</h5>

            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            </div>
        </Layout>
    );
};

export default Signin;
