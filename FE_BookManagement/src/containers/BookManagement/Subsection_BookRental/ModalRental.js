import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalRental.scss"
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
class ModalRental extends Component {

    constructor(props) {
        super(props);
        this.state = {
            provisional: 0,
            discountAmount: 0,
            totalPrice: 0,
            isExistsDiscount: false,
            isExistsCustomer: false,
            isDebt: false,
            customerPay: undefined,
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
            columns: [{
                name: "Book Title",
                selector: 'title',
                sortable: true,
            },
            {
                name: "Quantity",
                selector: 'quantity',
                cell:
                    (row) =>
                        <input
                            defaultValue={row.quantity}
                            type="number"
                            min={1}
                            max={10000}
                            style={{
                                "width": "80px",
                                "border": "none",
                                "height": "20px",
                                'background': "#c6c5c52e",
                                "border-radius": "3px"
                            }}
                            onChange={(e) => { this.handleOnchangeQuantity(row, e) }}
                        />
            },
            {
                name: "Net Amount",
                selector: "netAmount",
            },
            {
                name: "Total Amount",
                selector: "totalAmount",
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteItem(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-danger'
                                    icon={faTrash}
                                />
                            </button>
                        </div>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            ],
        }
    }

    handleOnchangeQuantity = (row, e) => {
        // const data = JSON.parse(JSON.stringify(this.state.dataTableBookSelect));
        const data = _.cloneDeep(this.state.dataTableBookSelect);
        let totalMoney = 0;
        data.forEach(item => {
            if (row.title === item.title) {
                item.quantity = e.target.value
                item.totalAmount = item.quantity * item.netAmount
            }
            totalMoney += item.totalAmount
        })
        let discountA = totalMoney * this.state.percentageDiscount / 100
        this.setState({
            dataTableBookSelect: [...data],
            provisional: totalMoney,
            discountAmount: discountA,
            totalPrice: totalMoney - discountA
        })
    }
    handleDeleteItem = (row) => {
        let data = _.cloneDeep(this.state.dataTableBookSelect);
        let totalMoney = this.state.provisional
        data.forEach(item => {
            if (row.title === item.title) {
                totalMoney -= item.totalAmount
            }
        })
        let discountA = totalMoney * this.state.percentageDiscount / 100
        let rows = data.filter(item => item.title !== row.title);
        this.setState({
            dataTableBookSelect: [...rows],
            provisional: totalMoney,
            discountAmount: discountA,
            totalPrice: totalMoney - discountA
        })
    }

    componentDidMount() {
        this.props.fetchAllBooks();
        this.props.fetchAllCustomers();
        this.props.fetchAllDiscounts();
    }
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
            () => {
                if (id === "discountId") {
                    this.checkExistsDiscount();
                }
                if (id == "phoneNumber") {
                    this.checkExistsCustomer();
                }
            }
        );
    }

    checkExistsCustomer = () => {
        let isExistsCustomer = false;
        let customerId = "";
        let customerState = "";
        let address = "";
        let email = "";
        let fullName = "";

        if (this.state.phoneNumber) {
            this.props.listCustomers.forEach(customer => {
                if (this.state.phoneNumber === customer.phoneNumber) {
                    isExistsCustomer = true;
                    customerId = customer.customerId;
                    fullName = customer.fullName;
                    customerState = customer.customerState;
                    address = customer.address;
                    email = customer.email;
                    return; // Exit the forEach loop early
                }
            });
        }

        this.setState({
            isExistsCustomer: isExistsCustomer,
            customerId: customerId,
            fullName: fullName,
            customerState: customerState,
            address: address,
            email: email
        });
    }

    checkExistsDiscount = () => {
        const { listDiscounts } = this.props;
        let isExistsDiscount = false;
        let percentageDiscount = 0;
        let messageCheckDiscount = "Discount isn't exists";

        listDiscounts.forEach(discount => {
            if (this.state.discountId == discount.discountId) {
                isExistsDiscount = true;
                percentageDiscount = discount.percentage;
                messageCheckDiscount = `Discount: ${discount.percentage}%`;
                return; // exit the forEach loop early
            }
        });
        this.setState({
            isExistsDiscount: isExistsDiscount,
            percentageDiscount: percentageDiscount,
            messageCheckDiscount: messageCheckDiscount
        });
        let discountTemp = this.state.provisional * percentageDiscount / 100;
        this.setState({
            discountAmount: discountTemp,
            totalPrice: this.state.provisional - discountTemp
        })
    }
    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
    };
    handleInsertBookSelect = () => {
        let bookSelected = this.state.selectedOption.label
        let flag = false
        if (!bookSelected) flag = true;
        this.state.dataTableBookSelect.forEach(row => {
            if (bookSelected === row.title) {
                flag = true;
            }
        })
        this.setState({
            selectedOption: "",
        })
        if (!flag) {
            let book;
            this.props.listBooks.forEach(item => {
                if (bookSelected === item.bookTitle) {
                    book = item;
                }
            })
            let copyDataTableBook = [...this.state.dataTableBookSelect];
            copyDataTableBook.push(
                {
                    "bookId": book.bookId,
                    'title': book.bookTitle,
                    'quantity': 1,
                    'netAmount': book.sellingPrice,
                    'totalAmount': book.sellingPrice
                }
            )
            let totalMoney = this.state.provisional + book.sellingPrice;
            let discountA = totalMoney * this.state.percentageDiscount / 100
            this.setState({
                dataTableBookSelect: copyDataTableBook,
                provisional: totalMoney,
                discountAmount: discountA,
                totalPrice: totalMoney - discountA
            })
        }
    }
    handleDept = () => {
        let dataBook = [];
        this.state.dataTableBookSelect.forEach((item) => {
            dataBook.push({
                quantity: item.quantity,
                bookId: item.bookId
            });
        });

        let disId = 0;
        if (this.state.isExistsDiscount && this.state.discountId) {
            disId = this.state.discountId
        }
        if (this.state.isExistsCustomer) {
            this.props.CreateInvoiceExistsCustomer(!this.state.isDebt,
                this.state.customerPay,
                {
                    customerId: this.state.customerId,
                    discountId: disId
                },
                dataBook
            )
        }
        else {
            this.props.CreateInvoiceNotExistsCustomer(!this.state.isDebt,
                this.state.customerPay,
                {
                    fullName: this.state.fullName,
                    rank: this.state.customerState,
                    sex: this.state.gender,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    email: this.state.email,
                },
                {
                    customerId: this.state.customerId,
                    discountId: disId
                },
                dataBook
            )
        }
        this.toggle()
    }
    handlePaid = () => {
        let dataBook = [];
        this.state.dataTableBookSelect.forEach((item) => {
            dataBook.push({
                quantity: item.quantity,
                bookId: item.bookId
            });
        });
        let disId = 0;
        if (this.state.isExistsDiscount && this.state.discountId) {
            disId = this.state.discountId
        }
        if (this.state.isExistsCustomer) {
            this.props.CreateInvoiceExistsCustomer(!this.state.isDebt,
                this.state.customerPay,
                {
                    customerId: this.state.customerId,
                    discountId: disId
                },
                dataBook
            )
        }
        else {
            this.props.CreateInvoiceNotExistsCustomer(!this.state.isDebt,
                this.state.customerPay,
                {
                    fullName: this.state.fullName,
                    rank: this.state.customerState,
                    sex: this.state.gender,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    email: this.state.email,
                },
                {
                    discountId: disId
                },
                dataBook
            )
        }
        this.toggle()
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                // isOpen={true}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create order</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Phone Number</label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.phoneNumber}
                                    type='text'
                                    style={{ "width": "100%" }}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                        </div>

                        {
                            this.state.isExistsCustomer &&
                            <>
                                <div
                                    className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Full Name</label>
                                    <input
                                        disabled={true}
                                        type='text'
                                        value={this.state.fullName}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Email</label>
                                    <input
                                        disabled={true}
                                        type='text'
                                        value={this.state.email}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Address</label>
                                    <input
                                        disabled={true}
                                        type='text'
                                        value={this.state.address}
                                    />
                                </div>
                            </>
                        }
                        {
                            !this.state.isExistsCustomer &&
                            <>
                                <div
                                    className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Full Name</label>
                                    <input
                                        type='text'
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                    />
                                </div>

                                <div className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Gender</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.gender}
                                            onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                        >
                                            <option value={"Male"}>Male</option>
                                            <option value={'Female'}>Female</option>
                                            <option value={"Other"}>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Customer State</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.customerState}
                                            onChange={(e) => this.handleOnchangeInput(e, 'customerState')}
                                        >
                                            <option value={"Normal"}>Normal</option>
                                            <option value={'Vip'}>Vip</option>
                                            <option value={"Gold"}>Gold</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Email</label>
                                    <input
                                        type='text'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>
                                <div className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Address</label>
                                    <input
                                        type='text'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                    />
                                </div>
                            </>
                        }
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Discount code</label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.discountId}
                                    type='text'
                                    style={{ "width": "100%" }}
                                    onChange={(e) => this.handleOnchangeInput(e, 'discountId')}
                                />
                            </div>
                        </div>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Discount code</label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.discountId}
                                    type='text'
                                    style={{ "width": "100%" }}
                                    onChange={(e) => this.handleOnchangeInput(e, 'discountId')}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='select-container d-flex mt-3 mb-3' style={{ width: "100%", justifyContent: "center" }}>
                        <div style={{ width: "400px", position: "relative", zIndex: "2" }}>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                            />
                        </div>
                        <button
                            style={{ width: "80px" }}
                            className="border-0 btn btn-primary ml-2"
                            type="button"
                            onClick={this.handleInsertBookSelect}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Insert
                        </button>
                    </div>
                    {
                        <DataTable
                            columns={this.state.columns}
                            data={this.state.dataTableBookSelect}
                            fixedHeader
                            fixedHeaderScrollHeight="330px"
                        />
                    }
                    {
                        this.state.dataTableBookSelect.length !== 0 &&
                        <div className="w-100 border-top border-2 mt-1">
                            <div className='d-flex'
                                style={{ "align-items": "center", "justifyContent": "left" }}
                            >
                                <label className='mr-2'>Provisional: {this.state.provisional}</label>
                            </div>
                            <div className='d-flex'
                                style={{ "align-items": "center", "justifyContent": "left" }}
                            >
                                <label className='mr-2'>Discount: {this.state.discountAmount}</label>
                            </div>
                            <div className='d-flex'
                                style={{ "align-items": "center", "justifyContent": "left" }}
                            >
                                <label className='mr-2'>Total Amount: {this.state.totalPrice}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input"
                                    type="checkbox"
                                    style={{ cursor: 'pointer' }}
                                    value={this.state.isDebt}
                                    onChange={() => {
                                        this.setState({
                                            isDebt: !this.state.isDebt
                                        })
                                    }}
                                />
                                <label className="form-check-label font-weight-bold" for="defaultCheck1">
                                    DEBT
                                </label>
                            </div>
                            {
                                this.state.isDebt &&
                                <div
                                    className='input-container'
                                    style={{ "width": "49%" }}
                                >
                                    <label>Paid amount</label>
                                    <input
                                        className='ml-2'
                                        type='text'
                                        value={this.state.customerPay}
                                        onChange={(e) => this.handleOnchangeInput(e, 'customerPay')}
                                    />
                                </div>
                            }
                        </div>
                    }
                </ModalBody>
                <ModalFooter style={{ "justifyContent": "space-evenly" }}>
                    <Button
                        disabled={!this.state.isDebt}
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger'
                        onClick={() => { this.handleDept() }}
                    >Debt</Button>
                    <Button
                        disabled={this.state.isDebt}
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handlePaid()}
                    >Paid</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listCustomers: state.customer.listCustomers,
        listBooks: state.book.listBooks,
        listDiscounts: state.discount.listDiscounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCustomers: () => dispatch(actions.fetchAllCustomersStart()),
        createNewCustomer: (data) => dispatch(actions.createNewCutomer(data)),
        fetchAllBooks: () => dispatch(actions.fetchAllBooksStart()),
        fetchAllDiscounts: () => dispatch(actions.fetchAllDiscountsStart()),
        // invoice
        CreateInvoiceNotExistsCustomer: (isPaid, customerPay, dataCustomer, dataInvoice, dataBook) => dispatch(actions.CreateInvoiceNotExistsCustomer(isPaid, customerPay, dataCustomer, dataInvoice, dataBook)),
        CreateInvoiceExistsCustomer: (isPaid, customerPay, dataInvoice, dataBook) => dispatch(actions.CreateInvoiceExistsCustomer(isPaid, customerPay, dataInvoice, dataBook)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRental);
