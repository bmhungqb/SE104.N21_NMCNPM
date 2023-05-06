import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer, ToastPosition } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';

import { CustomToastCloseButton } from '../components/CustomToast';
// new
import HomePage from './HomePage/homePage.js'
import BookManage from './BookManagement/bookManage.js';
import BookPurchase from './BookManagement/Subsection_BookPurchase/BookPurchase';
import CustomerManage from './CustomerManagement/CustomerManage';
import SupplierManage from './SupplierManagement/SupplierManage';
import UserManage from './Users/UserManage';
// 
import CustomScrollbars from '../components/CustomScrollbars'
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh' }}>
                                <Switch>
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.HOMEPAGE} component={userIsAuthenticated(HomePage)} />
                                    <Route path={path.BOOK_MANAGEMENT} component={userIsAuthenticated(BookManage)} />
                                    <Route path={path.BOOK_PURCHASE} component={userIsAuthenticated(BookPurchase)} />
                                    <Route path={path.CUSTOMER_MANAGEMENT} component={userIsAuthenticated(CustomerManage)} />
                                    <Route path={path.SUPPLIER_MANAGEMENT} component={userIsAuthenticated(SupplierManage)} />
                                    <Route path={path.USER_MANAGEMENT} component={userIsAuthenticated(UserManage)} />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position='bottom-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);