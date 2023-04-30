import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./sideBar.scss"
class SideBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="border-end bg-white" id="sidebar-wrapper">
                    <div class="sidebar-heading border-bottom bg-light">

                    </div>
                    <div class="list-group list-group-flush">
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/home">Home</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/book-management">Book Management</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/book-purchase">Book Purchase</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/book-rental">Book Rental</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/customer-management">Customer Management</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Supplier Management</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Users</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Discount code</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Conversation</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Notifications</a>
                        {/* line here */}
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Get Technical Help</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
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
