import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SupplierManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableSupplierManage from './TableSupplierManage';
class SupplierManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModalUser: false,
            isOpenModalEditBook: false,
            isOpenModalDeleteBook: false,
        }
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
    toggleBookEditModal = () => {
        this.setState({
            isOpenModalEditBook: !this.state.isOpenModalEditBook,
        })
    }
    toggleBookDeleteModal = () => {
        this.setState({
            isOpenModalDeleteBook: !this.state.isOpenModalDeleteBook,
        })
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                {/* <ModalBook
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                />
                {
                    this.state.isOpenModalEditBook &&
                    <ModalEditBook
                        isOpen={this.state.isOpenModalEditBook}
                        toggleFromParent={this.toggleBookEditModal}
                    />
                }
                {
                    this.state.isOpenModalDeleteBook &&
                    <ModalDeleteBook
                        isOpen={this.state.isOpenModalDeleteBook}
                        toggleFromParent={this.toggleBookDeleteModal}
                    />
                } */}
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='supplier-manage-container'>
                        <div className='supplier-manage-header'>
                            <p className='title-header'>Book Management</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='supplier-manage-content'>
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
                                    // onClick={() => this.handleAddNewUser()}
                                    ><i className="fa fa-plus"></i> Add Supplier</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableSupplierManage
                                // toggleFromParent={this.toggleBookEditModal}
                                // toggleBookDeleteModal={this.toggleBookDeleteModal}
                                />
                            </div>

                        </div>
                        <div className='supplier-manage-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManage);
