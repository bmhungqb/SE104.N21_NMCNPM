import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableBookPurchase.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
class TableBookPurchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "Invoice ID",
                selector: "id",
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
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
                selector: "date",
            },
            {
                name: "Status",
                selector: "status",
                cell: (row) =>
                    <button
                        className='border-0'
                        onClick={() => { this.handleViewDetailOrder(row) }}
                        data-tag="allowRowEvents"
                        style={row.status === "Debt" ?
                            { "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#F0483E" } :
                            { "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#03A9F5" }
                        }
                    >
                        {row.status}
                    </button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            ],
            data: [{

                id: 1,
                customerId: "buh hung",
                name: '2003',
                totalAmount: '2003',
                date: 'swq',
                status: 'Debt',
            },
            {
                id: 1,
                customerId: "buh hung",
                name: '2003',
                totalAmount: '2003',
                date: 'Paid',
                status: 'Paid',
            },
            ],
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

    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Fragment>
                <DataTable
                    columns={this.state.columns}
                    data={this.state.data}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBookPurchase);
