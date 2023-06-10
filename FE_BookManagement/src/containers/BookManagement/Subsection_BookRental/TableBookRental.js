import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableBookRental.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from "../../../store/actions/index"
class TableBookRental extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "Rental ID",
                selector: "rentId",
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
                name: "Start Date",
                selector: "startDate",
            },
            {
                name: "Due Date",
                selector: "dueDate",
            },
            {
                name: "Rental Status",
                selector: "status",
                cell: (row) =>
                    <button
                        className='border-0'
                        onClick={() => { this.handleViewDetailRent(row) }}
                        data-tag="allowRowEvents"
                        style={row.status == "end" ?
                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#F0483E" } :
                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "green" }
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

    handleViewDetailRent = (row) => {
        this.props.getRentId(row.rentId)
        this.props.toggleFromParent()
    }
    componentDidMount() {
        this.props.fetchAllRents("ALL")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listRents !== this.props.listRents) {
            let arr = []
            this.props.listRents.map((item) => {
                let date = new Date(Date.parse(item.createdAt)).toLocaleDateString();
                let dateReturn = new Date(Date.parse(item.dateReturn)).toLocaleDateString();
                let currentDate = new Date().toLocaleDateString();
                arr.push({
                    "rentId": item.rentId,
                    "customerId": item.customerId,
                    "name": item.Customers[0].fullName,
                    "totalAmount": item.rentPrice,
                    "startDate": date,
                    "dueDate": dateReturn,
                    // "status": item.status ? "Paid" : "Debt"
                    "status": new Date(dateReturn) < new Date(currentDate) ? "end" : "borrow"
                })
            })
            this.setState({
                dataTableInvoice: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                this.setState({
                    dataTableInvoice: this.props.listRents,
                    optionSearch: this.props.optionSearch
                })
            }
            else {
                const arr = this.props.listRents.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
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
        listRents: state.rent.listRents
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRents: (id) => dispatch(actions.fetchAllRents(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBookRental);
