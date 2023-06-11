import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './BookPurchase.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../Header/Header';
import SideBar from '../../SideBar/sideBar';
import TableBookPurchase from './TableBookPurchase';
import ModalOrder from './ModalOrder';
import ModalViewOrder from './ModalViewOrder';
import { FormattedMessage } from 'react-intl';
class BookPurchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModalOrder: false,
            isOpenModalViewOrder: false,
            isOpenModalDeleteBook: false,
            isModalPaid: false,
            invoiceId: undefined,
            selectFilter: "invoiceId",
            inputSearch: "",
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
    toggleViewOrderModal = (id) => {
        this.setState({
            isOpenModalViewOrder: !this.state.isOpenModalViewOrder,
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
                <ModalOrder
                    isOpen={this.state.isOpenModalOrder}
                    toggleFromParent={this.toggleOrderModal}
                />
                {
                    this.state.isOpenModalViewOrder &&
                    <ModalViewOrder
                        isModalPaid={this.state.isModalPaid}
                        isOpen={this.state.isOpenModalViewOrder}
                        toggleFromParent={(id) => this.toggleViewOrderModal(id)}
                        invoiceId={this.state.invoiceId}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='book-purchase-container'>
                        <div className='book-purchase-header'>
                            <p className='title-header'><FormattedMessage id='book-purchase.book-purchase' /></p>
                            <p className='infor-header'></p>
                        </div>
                        <div className='book-purchase-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-50">
                                    <input
                                        style={{ "height": "46px" }}
                                        placeholder={this.props.language === "en" ? "Please enter a search query..." : "Nhập để tìm kiếm..."}
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
                                            <option value={"invoiceId"}>{this.props.language === "en" ? "Book ID" : "Mã đơn hàng"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mx-1 button-add'>
                                    <button
                                        className='btn px-3'
                                        onClick={() => this.handleCreateOrder()}
                                    ><i className="fa fa-plus mr-1"></i><FormattedMessage id='book-purchase.btn-create-order' /></button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableBookPurchase
                                    toggleFromParent={this.toggleViewOrderModal}
                                    toggleBookDeleteModal={this.toggleBookDeleteModal}
                                    getInvoiceId={(invoiceId) => this.getInvoiceId(invoiceId)}
                                    optionSearch={[this.state.inputSearch, this.state.selectFilter]}
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPurchase);
