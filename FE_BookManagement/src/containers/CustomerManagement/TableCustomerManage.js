import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableCustomerManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import * as actions from "../../store/actions/index"
class TableCustomerManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableCustomer: [],
            columns: [{
                name: "Customer ID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Full Name",
                selector: 'fullName',
            },
            {
                name: "Address",
                selector: "address",
            },
            {
                name: "Phone Number",
                selector: "phoneNumber",
            },
            {
                name: "State",
                selector: "customerState",
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>

                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditCustomer(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteCustomer(row) }}
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
            optionSearch: [],
            dataTableCustomer: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditCustomer = (row) => {
        this.props.getCustomerEdit(row.id)
        this.props.toggleCustomerEditModal();
    }
    handleDeleteCustomer = (row) => {
        this.props.getCustomerDelete(row.id)
        this.props.toggleCustomerDeleteModal();
    }
    caseInsensitiveSort = (rowA, rowB) => {
        var a = rowA.title.toLowerCase();
        var b = rowB.title.toLowerCase();

        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1;
        }

        return 0;
    };
    componentDidMount() {
        this.props.fetchAllCustomers()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCustomers !== this.props.listCustomers) {
            let arr = []
            this.props.listCustomers.map((item, index) => {
                arr.push({
                    "id": item.id,
                    "fullName": item.firstName + " " + item.lastName,
                    "address": item.address,
                    "phoneNumber": item.phoneNumber,
                    "customerState": item.customerState
                })
            })
            this.setState({
                dataTableCustomer: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                let arr = []
                this.props.listCustomers.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "fullName": item.firstName + " " + item.lastName,
                        "address": item.address,
                        "phoneNumber": item.phoneNumber,
                        "customerState": item.customerState
                    })
                })
                this.setState({
                    dataTableCustomer: arr,
                    optionSearch: this.props.optionSearch

                })
            }
            else {
                let listCustomerFilter;
                if (this.props.optionSearch[1] == 'fullName') {
                    listCustomerFilter = this.props.listCustomers.filter(row =>
                        (row['firstName'] + " " + row['lastName']).toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase())
                    )
                }
                else {
                    listCustomerFilter = this.props.listCustomers.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                }
                let arr = []
                listCustomerFilter.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "fullName": item.firstName + " " + item.lastName,
                        "address": item.address,
                        "phoneNumber": item.phoneNumber,
                        "customerState": item.customerState
                    })
                })
                this.setState({
                    dataTableCustomer: arr,
                    optionSearch: this.props.optionSearch

                })
            }
        }
    }
    render() {
        return (
            <Fragment>
                <DataTable
                    columns={this.state.columns}
                    data={this.state.dataTableCustomer}
                    pagination
                    paginationComponentOptions={this.paginationComponentOptions}
                    fixedHeader
                    fixedHeaderScrollHeight="435px"
                />
            </Fragment>

        )
    }

}

const mapStateToProps = state => {
    return {
        listCustomers: state.customer.listCustomers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCustomers: () => dispatch(actions.fetchAllCustomersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCustomerManage);
