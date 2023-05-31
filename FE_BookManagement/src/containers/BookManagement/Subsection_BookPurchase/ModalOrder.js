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
class ModalOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            isExistsCustomer: false,
            firstName: "",
            lastName: "",
            customerState: "",
            gender: "",
            phoneNumber: "",
            address: "",
            email: "",
            birthDay: "",
            fullName: "",
            customerState: "",
            options: [],
            selectedOption: [],
            dataTableBookSelect: [
            ],
            columns: [{
                name: "Book Title",
                selector: 'title',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Quantity",
                selector: 'quantity',
                cell:
                    (row) =>
                        <input
                            defaultValue={row.quantity}
                            type="number"
                            min={0}
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
        let data = this.state.dataTableBookSelect;
        let totalMoney = 0;
        data.forEach(item => {
            if (row.title === item.title) {
                item.quantity = e.target.value
                item.totalAmount = item.quantity * item.netAmount
            }
            totalMoney += item.totalAmount
        })
        this.setState({
            dataTableBookSelect: data,
            totalPrice: totalMoney
        })
    }
    handleDeleteItem = (row) => {
        let arr = this.state.dataTableBookSelect;
        arr.forEach(item => {
            if (item.title === row.title) {
                arr.pop(item)
                return;
            }
        })
    }
    componentDidMount() {
        this.props.fetchAllBooks();
        this.props.fetchAllCustomers();
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
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        // if (id === "phoneNumber") {
        //     this.checkExistsCustomer();
        // }
    }
    checkExistsCustomer = () => {
        this.setState({
            isExistsCustomer: false,
            firstName: "",
            lastName: "",
            customerState: "",
            gender: "",
            address: "",
            email: "",
            birthDay: "",
            fullName: "",
            customerState: ""
        })
        if (this.state.phoneNumber) {
            this.props.listCustomers.forEach(customer => {
                if (this.state.phoneNumber === customer.phoneNumber) {
                    this.setState({
                        isExistsCustomer: true,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        customerState: customer.customerState,
                        gender: customer.gender,
                        address: customer.address,
                        email: customer.email,
                        birthDay: customer.birthDay,
                        fullName: customer.firstName + customer.lastName,
                    })
                    return;
                }
            });
        }
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
        if (!flag) {
            let book;
            this.props.listBooks.forEach(item => {
                if (bookSelected === item.bookTitle) {
                    book = item;
                }
            })
            let copyDataTableBook = this.state.dataTableBookSelect;
            copyDataTableBook.push(
                {
                    'title': book.bookTitle,
                    'quantity': 1,
                    'netAmount': book.sellingPrice,
                    'totalAmount': book.sellingPrice
                }
            )
            this.setState({
                dataTableBookSelect: copyDataTableBook
            })
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }

    render() {
        let { dataTableBookSelect } = this.state
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
                            style={{ "width": "100%" }}
                        >
                            <label>Phone Number</label>
                            <div className='d-flex'>
                                <input
                                    value={this.state.phoneNumber}
                                    type='text'
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                />
                                <button
                                    className={"border-0 btn btn-primary ml-2"}
                                    type="button"
                                    onClick={() => { this.checkExistsCustomer() }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        </div>
                        {
                            this.state.isExistsCustomer &&
                            <>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Full Name</label>
                                    <input
                                        className='w-100'
                                        type='text'
                                        value={this.state.fullName}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Email</label>
                                    <input
                                        className='w-100'
                                        type='text'
                                        value={this.state.email}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Address</label>
                                    <input
                                        className='w-100'
                                        type='text'
                                        value={this.state.address}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>State</label>
                                    <input
                                        className='w-100'
                                        type='text'
                                        value={this.state.customerState}
                                    />
                                </div>
                            </>
                        }
                        {
                            !this.state.isExistsCustomer &&
                            <>
                                <div
                                    className='input-container'
                                    style={{ "width": "30%" }}
                                >
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={this.state.firstName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                    />
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "30%" }}
                                >
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={this.state.lastName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                    />
                                </div>

                                <div className='input-container'
                                    style={{ "width": "30%" }}
                                >
                                    <label>Gender</label>
                                    <div className='select-genre'>
                                        <select
                                            style={{ "width": "90%" }}
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
                                    style={{ "width": "30%" }}
                                >
                                    <label>Date of birth</label>
                                    <DatePicker
                                        style={{ "width": "90%" }}
                                        onChange={this.handleOnchangeDatePicker}
                                        value={this.state.birthDay}
                                    />
                                </div>
                                <div className='input-container'
                                    style={{ "width": "30%" }}
                                >
                                    <label>Customer State</label>
                                    <div className='select-genre'>
                                        <select
                                            style={{ "width": "90%" }}
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
                                    style={{ "width": "30%" }}
                                >
                                    <label>Email</label>
                                    <input
                                        style={{ "width": "90%" }}
                                        type='text'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>
                                <div className='input-container'
                                    style={{ "width": "100%" }}
                                >
                                    <label>Address</label>
                                    <input
                                        style={{ "width": "59%" }}
                                        type='text'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                    />
                                </div>
                            </>
                        }

                    </div>
                    <div
                        className='select-container d-flex mt-3 mb-3'
                        style={{ "width": "100%", "justifyContent": "center" }}
                    >
                        <div
                            style={{ "width": "400px", "position": "inherit", "z-index": "2" }}
                        >
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                            />
                        </div>
                        <button
                            style={{ "width": "80px" }}
                            className={"border-0 btn btn-primary ml-2"}
                            type="button"
                            onClick={() => { this.handleInsertBookSelect() }}
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
                        <div className="float-right mr-5">
                            <div className='d-flex'
                                style={{ "align-items": "center" }}
                            >
                                <label className='mr-2 bg-primary'>Discount:</label>
                                <p>100000</p>
                            </div>
                            <div className='d-flex'
                                style={{ "align-items": "center" }}
                            >
                                <label className='mr-2 bg-primary'>Total Amount: </label>
                                <p>{this.state.totalPrice}</p>
                            </div>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewOrder()}
                    >Add</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listCustomers: state.customer.listCustomers,
        listBooks: state.book.listBooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCustomers: () => dispatch(actions.fetchAllCustomersStart()),
        fetchAllBooks: () => dispatch(actions.fetchAllBooksStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);
