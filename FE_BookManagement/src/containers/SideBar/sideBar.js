import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./sideBar.scss"
class SideBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="border-end bg-white" id="sidebar-wrapper">
                    <div className="sidebar-heading border-bottom bg-light">

                    </div>
                    <div className="list-group list-group-flush">
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/home">Home</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/book-management">Book Management</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/book-purchase">Book Purchase</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/book-rental">Book Rental</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/customer-management">Customer Management</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/supplier-management">Supplier Management</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user-management">Users</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Discount code</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Conversation</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Notifications</a>
                        {/* line here */}
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Get Technical Help</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
                    </div>
                </div>
            </React.Fragment>
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
