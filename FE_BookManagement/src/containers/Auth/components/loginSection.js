import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './loginSection.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, faa } from '@fortawesome/fontawesome-svg-core/import.macro'
import { } from '@fortawesome/free-solid-svg-icons';
class LoginSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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
                        {/* Login with google */}
                        <div className='login-with-google'>
                            <button type='button' className='btn btn-lg btn-outline-primary w-100 mb-1'>
                                <p>Sign in with Google</p>
                                {/* <FontAwesomeIcon icon={faGoogleLogo} /> */}
                            </button>
                        </div>
                        <div className='login-user-pass'>
                            <form>
                                <div className="form-group mt-3">
                                    <label className='font-weight-bold'>Email</label>
                                    <input type="email" className="form-control form-control-lg" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label className='font-weight-bold'>Password</label>
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" />
                                </div>
                                <div className='remember-forget d-flex justify-content-between'>
                                    <div className="form-check pl-0">
                                        <input type="checkbox" />
                                        <label className="form-check-label">Remember me</label>
                                    </div>
                                    <p>Forgot password?</p>
                                </div>
                                <button type="submit" className="btn-submit btn btn-lg btn-outline-primary w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className='login-footer'>
                        <p>Not regestered yet?</p>
                        <a>Create a new account</a>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
