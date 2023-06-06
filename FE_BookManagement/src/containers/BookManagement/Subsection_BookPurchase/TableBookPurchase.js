import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableBookPurchase.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from "../../../store/actions/index"
class TableBookPurchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "Invoice ID",
                selector: "invoiceId",
                sortable: true,
            },
            {
                name: "Customer ID",
                selector: "customerId",
            },
            {
                name: "Name",
                selector: "name",
            },
            {
                name: "Total Amount",
                selector: "totalAmount",
            },
            {
                name: "Date",
                selector: "createAt",
            },
            {
                name: "Status",
                selector: "status",
                cell: (row) =>
                    <button
                        className='border-0'
                        onClick={() => { this.handleViewDetailOrder(row) }}
                        data-tag="allowRowEvents"
                        style={row.status == "Paid" ?
                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#F0483E" } :
                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#03A9F5" }
                        }
                    >
                        {row.status}
                    </button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            ],
            dataTableInvoice: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleViewDetailOrder = (row) => {
        if (row.status === "Debt") {

        }
        else {

        }
    }
    componentDidMount() {
        this.props.fetchAllInvoicesStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listInvoices !== this.props.listInvoices) {
            let arr = []
            this.props.listInvoices.map((item, index) => {
                let date = new Date();
                date = item.createAt.strptime();
                arr.push({
                    "invoiceId": item.invoiceId,
                    "customerId": item.customerId,
                    "name": item.Customers[0].fullName,
                    "totalAmount": item.totalPrice,
                    "createAt": date.getDate(),
                    "status": item.status ? "Paid" : "Debt"
                })
            })
            this.setState({
                dataTableInvoice: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                this.setState({
                    dataTableInvoice: this.props.listInvoices,
                    optionSearch: this.props.optionSearch
                })
            }
            else {
                const arr = this.props.listInvoices.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                this.setState({
                    dataTableInvoice: arr,
                    optionSearch: this.props.optionSearch
                })
            }
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Fragment>
                <DataTable
                    columns={this.state.columns}
                    data={this.state.dataTableInvoice}
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
        listInvoices: state.invoice.listInvoices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllInvoicesStart: () => dispatch(actions.fetchAllInvoicesStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBookPurchase);
