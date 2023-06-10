import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../../store/actions'
import './loginSection.scss'
import { event } from 'jquery';
import e from 'cors';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
class LoginSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: ""
        }
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.setState({
                    errMessage: ""
                })
                this.props.userLoginSuccess(data.user)
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
            errMessage: ""
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
            errMessage: ""
        })
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <Fragment>
                <div className='login-container'>
                    <div className='login-header'>
                        <p className='title'>Login</p>
                        <p className='description'>See your growth and get support!</p>
                    </div>
                    <div className='login-content'>
                        <div className='login-user-pass'>
                            <form>
                                <div className="form-group mt-3">
                                    <label className='font-weight-bold'>Username</label>
                                    <input
                                        type="text"
                                        className="form-input form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={this.state.username}
                                        onChange={(e) => { this.handleOnchangeUsername(e) }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='font-weight-bold'>Password</label>
                                    <div className='input-group d-flex'>
                                        <input
                                            type={this.state.isShowPassword ? "text" : "password"}
                                            className="form-input form-control form-control-lg py-2 border-right-0 border"
                                            placeholder="Enter your password"
                                            value={this.state.password}
                                            onChange={(e) => { this.handleOnchangePassword(e) }}
                                            onKeyDown={(e) => { this.handleKeyDown(e) }}
                                        />
                                        <span className="input-group-append">
                                            <button
                                                className="btn btn-outline-secondary border-left-0 border"
                                                type="button"
                                                onClick={() => { this.handleShowHidePassword() }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={this.state.isShowPassword ? faEyeSlash : faEye}
                                                />
                                            </button>
                                        </span>
                                    </div>

                                </div>
                                <div className='remember-forget d-flex justify-content-between mb-2 align-items-center'>
                                    <div className="form-check d-flex">
                                        <input type="checkbox" className='form-check-input' />
                                        <label className="form-check-label ml-2">Remember me</label>
                                    </div>
                                    <div className='show-error'>
                                        {this.state.errMessage != "" &&
                                            <span style={{ "color": "red" }}>{this.state.errMessage}</span>
                                        }
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    className="btn-submit btn btn-lg btn-outline-primary w-100 mt-3"
                                    onClick={() => { this.handleLogin() }}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* <div className='login-footer d-flex mt-4'>
                        <p className='font-weight-bold'>Not regestered yet?</p>
                        <a className='ml-2'>Create a new account</a>
                    </div> */}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
