import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./sideBar.scss"
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { NavLink } from 'react-router-dom';
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="border-end bg-white" id="sidebar-wrapper">
                    <div className="sidebar-heading border-bottom bg-light">
                    </div>
                    <div className="list-group list-group-flush">
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/home'>Home</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to='/book-management'>Book Management</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-purchase">Book Purchase</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/book-rental">Book Rental</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer-management">Customer Management</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/supplier-management">Supplier Management</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/user-management">Users</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer-">Discount code</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/conversation">Conversation</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/notifications">Notifications</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/technical-help">Get Technical Help</NavLink>
                        <NavLink className="list-group-item list-group-item-action list-group-item-light p-3" to="/s">Settings</NavLink>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
