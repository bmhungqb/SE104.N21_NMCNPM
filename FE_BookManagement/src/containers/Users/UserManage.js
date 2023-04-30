import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import TableUserManage from './TableUserManage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isOpenModalEditCustomer: false,
            isOpenModalDeleteCustomer: false,
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
    toggleCustomerEditModal = () => {
        this.setState({
            isOpenModalEditCustomer: !this.state.isOpenModalEditCustomer,
        })
    }
    toggleCustomerDeleteModal = () => {
        this.setState({
            isOpenModalDeleteCustomer: !this.state.isOpenModalDeleteCustomer,
        })
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                {/* <ModalCustomer
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                />
                {
                    this.state.isOpenModalEditCustomer &&
                    <ModalEditCustomer
                        isOpen={this.state.isOpenModalEditCustomer}
                        toggleFromParent={this.toggleCustomerEditModal}
                    />
                }
                {
                    this.state.isOpenModalDeleteCustomer &&
                    <ModalDeleteCustomer
                        isOpen={this.state.isOpenModalDeleteCustomer}
                        toggleFromParent={this.toggleCustomerDeleteModal}
                    />
                } */}
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='user-manage-container'>
                        <div className='user-manage-header'>
                            <p className='title-header'>Users</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='user-manage-content'>
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
                                <div className='button-control'>
                                    <button
                                        className='mx-2 btn px-3 btn-info'
                                        onClick={() => this.handleAddCustomer()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                        Add Customer</button>
                                    <button
                                        className='mx-2 btn px-3 btn-primary'
                                        onClick={() => this.handleEditCustomer()}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className='mx-1' />
                                        Edit Details</button>
                                    <button
                                        className='mx-2 btn px-3 btn-danger'
                                        onClick={() => this.handleDeleteCustomer()}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className='mx-1' />
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableUserManage
                                // toggleFromParent={this.toggleCustomerEditModal}
                                // toggleCustomerDeleteModal={this.toggleCustomerDeleteModal}
                                />
                            </div>

                        </div>
                        <div className='user-manage-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
