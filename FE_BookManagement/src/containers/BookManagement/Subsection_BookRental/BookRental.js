import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './BookRental.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../Header/Header';
import SideBar from '../../SideBar/sideBar';
import TableBookRental from './TableBookRental';
import ModalRental from './ModalRental';
import ModalViewRental from './ModalViewRental';
class BookRental extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModalOrder: false,
            isOpenModalViewRental: false,
            isOpenModalDeleteBook: false,
            isModalPaid: false,
            invoiceId: undefined,
        }
    }
    getInvoiceId = (invoiceId) => {
        this.setState({
            invoiceId: invoiceId
        })
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
    toggleViewRentalModal = (id) => {
        this.setState({
            isOpenModalViewRental: !this.state.isOpenModalViewRental,
        })
        if (id === "debt") {
            this.setState({
                isModalPaid: false
            })
        }
        else {
            this.setState({
                isModalPaid: true
            })
        }
    }
    toggleBookDeleteModal = () => {
        this.setState({
            isOpenModalDeleteBook: !this.state.isOpenModalDeleteBook,
        })
    }
    handleOnchangeInputFilter = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <ModalRental
                    isOpen={this.state.isOpenModalOrder}
                    toggleFromParent={this.toggleOrderModal}
                />
                {
                    this.state.isOpenModalViewRental &&
                    <ModalViewRental
                        isModalPaid={this.state.isModalPaid}
                        isOpen={this.state.isOpenModalViewRental}
                        toggleFromParent={(id) => this.toggleViewRentalModal(id)}
                        invoiceId={this.state.invoiceId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='book-purchase-container'>
                        <div className='book-purchase-header'>
                            <p className='title-header'>Book Rental</p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='book-purchase-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-50">
                                    <input
                                        style={{ "height": "46px" }}
                                        placeholder={'Enter search by ' + this.state.selectFilter}
                                        type="text"
                                        className="form-control w-75"
                                        onChange={(e) => this.handleOnchangeInputFilter(e, 'inputSearch')}
                                    />
                                    <div className="input-group-append">
                                        <select
                                            className="form-select w-100 brounded-0"
                                            value={this.state.selectFilter}
                                            onChange={(e) => this.handleOnchangeInputFilter(e, 'selectFilter')}
                                            style={{ "cursor": "pointer" }}
                                        >
                                            <option value={"id"}>ID</option>
                                            <option value={"bookTitle"}>Title</option>
                                            <option value={"authorName"}>Author</option>
                                            <option value={"genre"}>Genre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mx-1 button-add'>
                                    <button
                                        className='btn px-3'
                                        onClick={() => this.handleCreateOrder()}
                                    ><i className="fa fa-plus"></i> Create Rent Receipt</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableBookRental
                                    toggleFromParent={this.toggleViewRentalModal}
                                    toggleBookDeleteModal={this.toggleBookDeleteModal}
                                    getInvoiceId={(invoiceId) => this.getInvoiceId(invoiceId)}
                                />
                            </div>

                        </div>
                        <div className='book-purchase-footer'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookRental);
