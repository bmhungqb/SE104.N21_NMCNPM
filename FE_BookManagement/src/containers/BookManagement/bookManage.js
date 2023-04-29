import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './bookManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import ModalBook from './ModalBook';
import TableBookManage from './TableBookManage';
class BookManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModalUser: false
        }
    }
    toggleFromParent = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <ModalBook
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                />
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='book-manage-container'>
                        <div className='book-manage-header'>
                            <p className='title-header'>Book Management</p>
                            <p className='infor-header'>Book information of the store</p>
                        </div>
                        <div className='book-manage-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-25">
                                    <input placeholder='Enter search' type="text" className="form-control h-100" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true">Search by</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">By ID</a>
                                            <a class="dropdown-item" href="#">By Author</a>
                                            <a class="dropdown-item" href="#">By Title</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-1 button-add'>
                                    <button
                                        className='btn px-3'
                                        onClick={() => this.handleAddNewUser()}
                                    ><i className="fa fa-plus"></i> Add New Book</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableBookManage />
                            </div>

                        </div>
                        <div className='book-manage-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
