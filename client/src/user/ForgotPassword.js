import React, { Component } from "react";
import { forgotPassword } from "./apiUser";


class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    };

    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };

    render() {
        return (

            <div className="container">
                <h5 className="mt-5 mb-2">Password Reset</h5>

                {this.state.message && (
                    <div className="alert alert-info">
                  <a>{this.state.message}</a>
                    </div>
                )}
                {this.state.error && (
                    <div className="alert alert-info">
                    <a>{this.state.error}</a>
                    </div>
                )}

                <form>
                    <div className="form-group mt-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({email: e.target.value,
                                    message: "",
                                    error: ""
                                })}
                            autoFocus/>
                    </div>

                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary">
                        Send Password Rest Link
                    </button>
                </form>
                <small><b>Note: </b>we will send password reset link to your registered email address.</small>
            </div>

        );
    }
}

export default ForgotPassword;