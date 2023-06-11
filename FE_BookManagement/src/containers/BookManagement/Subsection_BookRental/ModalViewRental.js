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
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                // isOpen={true}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.detail-rent-receipt' /></ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.phone-number' /></label>
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
                            <label><FormattedMessage id='modal.name' /></label>
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
                            <label><FormattedMessage id='modal.email' /></label>
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
                            <label><FormattedMessage id='modal.address' /></label>
                            <input
                                disabled={true}
                                type='text'
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.lease-start-date' /></label>
                            <DatePicker
                                disabled={true}
                                value={this.state.leaseDate}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label><FormattedMessage id='modal.day-rent' /></label>
                            <input
                                disabled={true}
                                type='text'
                                value={this.state.dayRent}
                            />
                        </div>
                    </div>
                    <DataTable
                        columns={[{
                            name: this.props.language === "en" ? "Book Title" : "Tên sách",
                            selector: 'title',
                            sortable: true,
                        },
                        {
                            name: this.props.language === "en" ? "Quantity" : "Số lượng",
                            selector: 'quantity',
                        },
                        {
                            name: this.props.language === "en" ? "Net Amount" : "Giá mượn",
                            selector: "netAmount",
                        },
                        {
                            name: this.props.language === "en" ? "Total Amount" : "Tổng tiền",
                            selector: "totalAmount",
                        },
                        ]}
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                    <div className="w-100 border-top border-2">
                        <div className='d-flex'
                            style={{ "align-items": "center", "justifyContent": "left" }}
                        >
                            <label className='mr-2 mt-3'>{this.props.language === "en" ? "Total Amount: " : "Tổng tiền: "} {this.state.rentPrice}</label>
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
        listDiscounts: state.discount.listDiscounts,
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
        // Rent
        fetchAllRents: (id) => dispatch(actions.fetchAllRents(id)),
        fetchAllRentsDetail: (id) => dispatch(actions.fetchAllRentsDetail(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRental);
