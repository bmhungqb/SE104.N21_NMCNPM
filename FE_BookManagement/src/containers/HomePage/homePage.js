import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './homeHeader.js';
import About from './Section/About.js';
import './homePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideBar from './slideBar.js';

class HomePage extends Component {
    render() {
        return (
            <div class="d-flex" id="wrapper">
                <div class="border-end bg-white" id="sidebar-wrapper">
                    <div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
                    <div class="list-group list-group-flush">
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Book Management</a>
                        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Custumer Management</a>
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
                <div id="page-content-wrapper">
                    <HomeHeader />
                    <div class="container-fluid">
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
