import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import { FormattedMessage } from 'react-intl';
import "./sideBar.scss"
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { NavLink } from 'react-router-dom';
import { faEllipsisVertical, faRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { USER_ROLE } from '../../utils/constant';
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: "MANAGER",
        }
    }
    componentDidMount() {
        let { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            this.setState({
                role: userInfo.roleId,
            })
        }
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <React.Fragment>
                <div className="border-end bg-white" id="sidebar-wrapper">
                    <div className="sidebar-heading bg-light">
                        <div className='logo'></div>
                        <p className='title'>BookHolic Management</p>
                    </div>
                    <div className='sidebar-infor'>
                        <div className='avatar'></div>
                        <div className='infor-user'>
                            <p className='name'>Rubikk</p>
                            <p className='role'>Admin</p>
                        </div>
                        <div class="dropdown dropleft">
                            <button
                                class="btn"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            // style={ }
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} fontSize={'20px'} />
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <NavLink
                                    className="dropdown-item"
                                    to='/profile'>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    My Profile
                                </NavLink>
                                <NavLink
                                    className="dropdown-item"
                                    to="/login"
                                    onClick={processLogout}
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    {this.state.role === USER_ROLE.MANAGER &&
                        <div className="list-group list-group-flush">
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/home'>Home</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>Book Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">Customer Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">Supplier Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">User Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/discount-management">Discount code</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/regulation-management">Regulations</NavLink>
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/technical-help">Get Technical Help</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/setting">Settings</NavLink> */}
                        </div>
                    }
                    {this.state.role === USER_ROLE.EMPLOYEE &&
                        <div className="list-group list-group-flush">
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/home'>Home</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>Book Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">Customer Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">Supplier Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">User Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/discount-management">Discount code</NavLink>
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/technical-help">Get Technical Help</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/setting">Settings</NavLink> */}
                        </div>
                    }
                    {this.state.role === USER_ROLE.SUPPORTER &&
                        <div className="list-group list-group-flush">
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/home'>Home</NavLink>
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>Book Management</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink> */}
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">Customer Management</NavLink>
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">Supplier Management</NavLink> */}
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">User Management</NavLink>
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/discount-management">Discount code</NavLink> */}
                            {/* <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/technical-help">Get Technical Help</NavLink>
                            <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/setting">Settings</NavLink> */}
                        </div>
                    }

                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        handleChangeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
