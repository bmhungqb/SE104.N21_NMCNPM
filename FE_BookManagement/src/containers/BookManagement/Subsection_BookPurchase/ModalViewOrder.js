import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalOrder.scss"
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from "../../../store/actions/index"
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-flatpickr';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import { data } from 'jquery';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { forEach } from 'lodash';
class ModalOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            provisional: 0,
            discountAmount: 0,
            remaining: 0,
            totalPrice: 0,
            isExistsDiscount: false,
            isExistsCustomer: false,
            customerPay: undefined,
            // 
            invoiceId: undefined,
            date: undefined,
            fullName: undefined,
            phoneNumber: undefined,
            email: undefined,
            address: undefined,
            // Create a customer
            customerId: "",
            customerState: "",
            gender: "",
            phoneNumber: "",
            address: "",
            email: "",
            fullName: "",
            customerState: "",
            // discount & books
            messageCheckDiscount: "Discount isn't exists",
            discountId: undefined,
            percentageDiscount: 0,
            options: [],
            selectedOption: "",
            dataTableBookSelect: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllBooks("ALL");
        this.props.fetchAllCustomers("ALL");
        this.props.fetchAllDiscounts("ALL");
        this.props.fetchAllInvoicesStart(this.props.invoiceId).then((data) => {
            let date = new Date(Date.parse(data.createdAt)).toLocaleDateString();
            this.setState({
                invoiceId: data.invoiceId,
                date: date,
                fullName: data.Customers[0]["fullName"],
                phoneNumber: data.Customers[0]["phoneNumber"],
                email: data.Customers[0]["email"],
                address: data.Customers[0]["address"],
                totalPrice: data.totalPrice,
                discountAmount: data.discountPrice,
                remaining: data.remaining
            })
            this.props.fetchAllInvoicesDetailStart(data.invoiceId).then((data) => {
                console.log("data: ", data)
                data.forEach((item, index) => {
                    let copyDataTableBook = [...this.state.dataTableBookSelect];
                    let totalA = parseInt(data[index].quantity) * parseInt(item.Books[0].sellingPrice)
                    copyDataTableBook.push(
                        {
                            "bookId": item.Books[0].bookId,
                            'title': item.Books[0].bookTitle,
                            'quantity': data[index].quantity,
                            'netAmount': item.Books[0].sellingPrice,
                            'totalAmount': totalA
                        }
                    )
                    this.setState({
                        dataTableBookSelect: copyDataTableBook,
                    })
                })
            })
        })
    }
    // this.props.fetchAllInvoicesDetailStart("ALL");
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBooks !== this.props.listBooks) {
            let options = [];
            this.props.listBooks.forEach(item => {
                options.push(
                    {
                        value: item.id,
                        label: item.bookTitle
                    }
                )
            })
            this.setState({
                options: options
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {
        const value = event.target.value;
        this.setState(
            { [id]: value },
        );
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
    };
    handleDept = () => {
        this.props.PayInvoiceAfter({
            invoiceId: this.state.invoiceId,
            customerPay: this.state.customerPay,
        })
        this.toggle()
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    <FormattedMessage id='modal.detail-invoice-title' />
                </ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.invoiceId' /></label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.invoiceId}
                                    type='text'
                                    style={{ "width": "100%" }}
                                />
                            </div>
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.date' /></label>
                            <input
                                type='text'
                                value={this.state.date}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.name' /></label>
                            <input
                                type='text'
                                value={this.state.fullName}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.phone-number' /></label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.phoneNumber}
                                    type='text'
                                    style={{ "width": "100%" }}
                                />
                            </div>
                        </div>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.email' /></label>
                            <input
                                type='text'
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.address' /></label>
                            <input
                                type='text'
                                value={this.state.address}
                            />
                        </div>
                    </div>
                    <DataTable
                        className='mt-3s'
                        columns={
                            [{
                                name: this.props.language === "en" ? "Book Title" : "Tên sách",
                                selector: 'title',
                                sortable: true,
                            },
                            {
                                name: this.props.language === "en" ? "Quantity" : "Số lượng",
                                selector: 'quantity',
                            },
                            {
                                name: this.props.language === "en" ? "Net Amount" : "Giá sách",
                                selector: "netAmount",
                            },
                            {
                                name: this.props.language === "en" ? "Total Amount" : "Tổng tiền",
                                selector: "totalAmount",
                            }]
                        }
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                    <div className={!this.props.isModalPaid ? "w-100 border-top border-2 mt-1 border-bottom" : "w-100 border-top border-2 mt-1"}
                    >
                        <div className='d-flex'
                            style={{ "align-items": "center", "justifyContent": "left" }}
                        >
                            <label className='mr-2'>{this.props.language === "en" ? "Total Amount: " : "Tổng tiền: "} {this.state.totalPrice}</label>
                        </div>
                        <div className='d-flex'
                            style={{ "align-items": "center", "justifyContent": "left" }}
                        >
                            <label className='mr-2'>{this.props.language === "en" ? "Discount: " : "Giảm giá: "} {this.state.discountAmount}</label>
                        </div>
                        {
                            !this.props.isModalPaid &&
                            <div className='d-flex'
                                style={{ "align-items": "center", "justifyContent": "left" }}
                            >
                                <label className='mr-2'>{this.props.language === "en" ? "Debt: " : "Nợ: "} {this.state.remaining}</label>
                            </div>
                        }
                    </div>
                    {
                        !this.props.isModalPaid &&
                        <div
                            className='input-container mt-3'
                            style={{ "width": "49%" }}
                        >
                            <label>{this.props.language === "en" ? "Paid amount" : "Số tiền trả"}</label>
                            <input
                                placeholder={this.props.language === "en" ? 'Enter paid amount' : "Nhập số tiền trả"}
                                className='ml-2'
                                type='text'
                                value={this.state.customerPay}
                                onChange={(e) => this.handleOnchangeInput(e, 'customerPay')}
                            />
                        </div>
                    }
                </ModalBody>
                <ModalFooter style={{ "justifyContent": "space-evenly" }}>
                    {!this.props.isModalPaid &&
                        <>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-danger'
                                onClick={() => { this.handleDept() }}
                            ><FormattedMessage id='modal.debt' /></Button>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-primary'
                                onClick={() => this.toggle()}
                            ><FormattedMessage id='modal.cancel' /></Button>
                        </>
                    }
                    {
                        this.props.isModalPaid &&
                        <Button
                            style={{ "height": "40px", "width": "150px" }}
                            className='px-5 border-0 bg-primary'
                            onClick={() => this.toggle()}
                        >OK</Button>
                    }
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listCustomers: state.customer.listCustomers,
        listBooks: state.book.listBooks,
        listDiscounts: state.discount.listDiscounts,
        listDiscountsDetail: state.discount.listDiscountsDetail,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchAllCustomers: () => dispatch(actions.fetchAllCustomersStart()),
        createNewCustomer: (data) => dispatch(actions.createNewCutomer(data)),
        fetchAllBooks: () => dispatch(actions.fetchAllBooksStart()),
        fetchAllDiscounts: () => dispatch(actions.fetchAllDiscountsStart()),
        // invoice
        CreateInvoiceNotExistsCustomer: (isPaid, customerPay, dataCustomer, dataInvoice, dataBook) => dispatch(actions.CreateInvoiceNotExistsCustomer(isPaid, customerPay, dataCustomer, dataInvoice, dataBook)),
        CreateInvoiceExistsCustomer: (isPaid, customerPay, dataInvoice, dataBook) => dispatch(actions.CreateInvoiceExistsCustomer(isPaid, customerPay, dataInvoice, dataBook)),
        // 
        fetchAllInvoicesStart: (id) => dispatch(actions.fetchAllInvoicesStart(id)),
        fetchAllInvoicesDetailStart: (id) => dispatch(actions.fetchAllInvoicesDetailStart(id)),
        PayInvoiceAfter: (data) => dispatch(actions.PayInvoiceAfter(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);
