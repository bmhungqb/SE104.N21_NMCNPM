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
import moment from 'moment/moment';
class ModalRental extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            isExistsCustomer: false,
            leaseDate: undefined,
            dueDate: undefined,
            rentDate: undefined,
            messageSelectBook: "",
            dayRent: undefined,
            rentPrice: undefined,
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
            },
            {
                name: "Net Amount",
                selector: "netAmount",
            },
            {
                name: "Total Amount",
                selector: "totalAmount",
            },
            ],
        }
    }

    componentDidMount() {
        this.props.fetchAllBooks();
        this.props.fetchAllCustomers();
        this.props.fetchAllDiscounts();
        this.props.fetchAllRents(this.props.rentId).then((data) => {
            this.setState({
                rentId: data.rentId,
                fullName: data.Customers[0]["fullName"],
                phoneNumber: data.Customers[0]["phoneNumber"],
                email: data.Customers[0]["email"],
                address: data.Customers[0]["address"],
                totalPrice: data.totalPrice,
                leaseDate: new Date(data.createdAt),
                dueDate: new Date(data.dateReturn),
                dayRent: data.dayRent,
                rentPrice: data.rentPrice,
            })
            this.props.fetchAllRentsDetail(data.rentId).then((data) => {
                data.forEach((item, index) => {
                    let copyDataTableBook = [...this.state.dataTableBookSelect];
                    let totalA = parseInt(data[index].quantity) * parseInt(item.Books[0].sellingPrice)
                    copyDataTableBook.push(
                        {
                            "bookId": item.Books[0].bookId,
                            'title': item.Books[0].bookTitle,
                            'quantity': data[index].quantity,
                            'netAmount': item.Books[0].sellingPrice * this.state.dayRent * 1.5 / 100,
                            'totalAmount': item.Books[0].sellingPrice * this.state.dayRent * 1.5 / 100 * data[index].quantity
                        }
                    )
                    this.setState({
                        dataTableBookSelect: copyDataTableBook,
                    })
                })
            })
        })
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
        this.setState({
            totalPrice: 0,
            isExistsCustomer: false,
            dueDate: undefined,
            rentDate: undefined,
            messageSelectBook: "",
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
            selectedOption: "",
            dataTableBookSelect: [],
        })
        this.props.toggleFromParent();
    }
    handleInsertBookSelect = () => {
        if (!this.state.leaseDate || !this.state.dueDate) {
            this.setState({
                messageSelectBook: "Please fill date !"
            })
            return;
        }
        else {
            this.setState({
                messageSelectBook: ""
            })
        }
        let bookSelected = this.state.selectedOption.label
        let flag = false
        if (!bookSelected) flag = true;
        this.state.dataTableBookSelect.forEach(row => {
            if (bookSelected === row.title) {
                flag = true;
            }
        })
        this.setState({
            selectedOption: undefined,
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
                    'netAmount': book.sellingPrice * this.state.rentDate * 1.5 / 100,
                    'totalAmount': book.sellingPrice * this.state.rentDate * 1.5 / 100
                }
            )
            let totalMoney = this.state.totalPrice + book.sellingPrice * this.state.rentDate * 1.5 / 100;
            this.setState({
                dataTableBookSelect: copyDataTableBook,
                totalPrice: totalMoney
            })
        }
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
                <ModalHeader toggle={() => { this.toggle() }}>Detail Rent Receipt</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Phone Number</label>
                            <div className='d-flex'>
                                <input
                                    disabled={true}
                                    value={this.state.phoneNumber}
                                    type='text'
                                    style={{ "width": "100%" }}
                                />
                            </div>
                        </div>
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
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Lease Start Date</label>
                            <DatePicker
                                disabled={true}
                                value={this.state.leaseDate}
                            />
                        </div>
                        <div className='input-container' style={{ width: "49%" }}>
                            <label>Due Date</label>
                            <DatePicker
                                disabled={true}
                                selected={this.state.dueDate}
                            />
                        </div>

                    </div>
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                    <div className="w-100 border-top border-2">
                        <div className='d-flex'
                            style={{ "align-items": "center", "justifyContent": "left" }}
                        >
                            <label className='mr-2 mt-3'>Total Amount: {this.state.rentPrice}</label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ "justifyContent": "space-evenly" }}>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.toggle()}
                    >OK</Button>
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
        // Rent
        fetchAllRents: (id) => dispatch(actions.fetchAllRents(id)),
        fetchAllRentsDetail: (id) => dispatch(actions.fetchAllRentsDetail(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRental);
