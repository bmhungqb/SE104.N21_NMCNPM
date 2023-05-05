import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './BookPurchase.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../Header/Header';
import SideBar from '../../SideBar/sideBar';
import TableBookPurchase from './TableBookPurchase';
import ModalOrder from './ModalOrder';
class BookPurchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModalOrder: false,
            isOpenModalEditBook: false,
            isOpenModalDeleteBook: false,
        }
    }
    handleCreateOrder = () => {
        this.setState({
            isOpenModalOrder: true,
        })
    }
    toggleOrderModal = () => {
        this.setState({
            isOpenModalOrder: !this.state.isOpenModalOrder,
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
                <ModalOrder
                    isOpen={this.state.isOpenModalOrder}
                    toggleFromParent={this.toggleOrderModal}
                />
                {/* {
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
                    <div className='book-manage-container'>
                        <div className='book-manage-header'>
                            <p className='title-header'>Book Purchase</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='book-manage-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-25">
                                    <input placeholder='Enter search' type="text" className="form-control h-100" />
                                    <div class="input-group-append">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true">Search by</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">By ID</a>
                                            <a className="dropdown-item" href="#">By Author</a>
                                            <a className="dropdown-item" href="#">By Title</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-1 button-add'>
                                    <button
                                        className='btn px-3'
                                        onClick={() => this.handleCreateOrder()}
                                    ><i className="fa fa-plus"></i> Create order</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableBookPurchase
                                    toggleFromParent={this.toggleBookEditModal}
                                    toggleBookDeleteModal={this.toggleBookDeleteModal}
                                />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookPurchase);
