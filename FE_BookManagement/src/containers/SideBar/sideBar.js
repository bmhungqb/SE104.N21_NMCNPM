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
import ModalMyInfor from './Infor/ModalMyInfor';
import { faHome, faBook, faUserCircle, faBoxesStacked, faTags, faBan, faUserAlt } from '@fortawesome/free-solid-svg-icons';
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: "MANAGER",
            // isOpenProfile: false
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
    toggle = () => {
        this.setState({
            isOpenProfile: !this.state.isOpenProfile
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <React.Fragment>
                {
                    <ModalMyInfor
                        isOpen={this.state.isOpenProfile}
                        toggleProfile={this.toggle}
                    />
                }
                <div className="border-end sidebar-container" id="sidebar-wrapper">
                    <div className="sidebar-heading bg-light">
                        <div className='logo'></div>
                        <p className='title'>BookHolic Management</p>
                    </div>
                    <div className='sidebar-infor'>
                        <div className='avatar'></div>
                        <div className='infor-user'>
                            <p className='name'>{this.props.userInfor.name}</p>
                            <p className='role'>{this.props.userInfor.role}</p>
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
                                <FontAwesomeIcon icon={faEllipsisVertical} fontSize={'20px'} color='#fff' />
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a
                                    style={{ "cursor": "pointer" }}
                                    className="dropdown-item text-primary"
                                    // to='/profile'
                                    onClick={() => { this.toggle() }}
                                >
                                    <FontAwesomeIcon icon={faCircleUser} className='mr-2' fontSize={'17px'} />
                                    My Profile
                                </a>
                                <NavLink
                                    className="dropdown-item text-danger"
                                    to="/login"
                                    onClick={processLogout}
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} color='red' className='mr-2' fontSize={'17px'} />
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    {true &&
                        <div className="list-group list-group-flush">
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to='/home'>
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faHome} />
                                <p>Home</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faBook} />
                                <p>Book Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserCircle} />
                                <p>Customer Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faBoxesStacked} />
                                <p>Supplier Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserAlt} />
                                <p>User Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/discount-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faTags} />
                                <p>Discount code</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/regulation-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faBan} />
                                <p>Regulations</p>
                            </NavLink>
                        </div>
                    }
                    {this.state.role === USER_ROLE.EMPLOYEE &&
                        <div className="list-group list-group-flush">
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to='/home'>
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faHome} />
                                <p>Home</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faBook} />
                                <p>Book Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserCircle} />
                                <p>Customer Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faBoxesStacked} />
                                <p>Supplier Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserAlt} />
                                <p>User Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/discount-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faTags} />
                                <p>Discount code</p>
                            </NavLink>
                        </div>
                    }
                    {this.state.role === USER_ROLE.SUPPORTER &&
                        <div className="list-group list-group-flush">
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to='/home'>
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faHome} />
                                <p>Home</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserCircle} />
                                <p>Customer Management</p>
                            </NavLink>
                            <NavLink className="d-flex align-items-center bg-transparent list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">
                                <FontAwesomeIcon
                                    font-size={'20px'}
                                    icon={faUserAlt} />
                                <p>User Management</p>
                            </NavLink>
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
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        handleChangeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
