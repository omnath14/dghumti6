import React, { Component } from "react";
import { resetPassword } from "./apiUser";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        };
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });

        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error, newPassword: "" });
            } else {
                console.log(data.message);
                this.setState({ message: data.message, newPassword: "" });
            }
        });
    };

    render() {
        return (
            <div className="container">
                <h5 className="mt-5 mb-2">Reset your Password</h5>

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

                <form
                    style={{ display: this.state.message.length ? "none" : "" }}>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your new password"
                            value={this.state.newPassword}
                            name="newPassword"
                            onChange={e =>
                                this.setState({
                                    newPassword: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            } autoFocus/>

                    </div>
                    <button
                        onClick={this.resetPassword}
                        className="btn btn-raised btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;
