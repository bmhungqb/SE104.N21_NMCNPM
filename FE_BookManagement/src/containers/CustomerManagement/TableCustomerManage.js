import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableCustomerManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
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
                name: "First Name",
                selector: 'firstName',
            },
            {
                name: "Last Name",
                selector: "lastName",
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
                cell:
                    (row) =>
                        < button
                            className='border-0 bg-transparent'
                            onClick={() => { this.handleEditCustomer(row) }}
                            data-tag="allowRowEvents"
                        >
                            <FontAwesomeIcon
                                className='icon-right text-primary'
                                icon={faPenToSquare}
                            />
                        </button >,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            {
                cell: (row) =>
                    <button
                        className='border-0 bg-transparent'
                        onClick={() => { this.handleDeleteCustomer(row) }}
                        data-tag="allowRowEvents"
                    >
                        <FontAwesomeIcon
                            className='icon-right text-danger'
                            icon={faTrash}
                        />
                    </button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            }
            ],
            dataTableBook: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditCustomer = (row) => {
        this.props.getCustomerEdit(row)
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
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrCustomers != this.props.arrCustomers) {
            let arr = []
            this.props.arrCustomers.map((item, index) => {
                arr.push(item)
            })
            this.setState({
                dataTableCustomer: arr
            })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCustomerManage);
