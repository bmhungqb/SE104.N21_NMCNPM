import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './homeHeader.js';
import './homePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideBar from './sideBar.js';
import DataDay from './Section/dataDay.js';
class HomePage extends Component {
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                <div id="page-content-wrapper">
                    <HomeHeader />
                    <DataDay />
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
