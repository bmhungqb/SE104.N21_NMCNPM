import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header.js';
import './homePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideBar from '../SideBar/sideBar.js';
import DataDay from './Section/dataDay.js';
import DataMonth from './Section/dataMonth.js';
class HomePage extends Component {
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <DataDay />
                    <DataMonth />
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
