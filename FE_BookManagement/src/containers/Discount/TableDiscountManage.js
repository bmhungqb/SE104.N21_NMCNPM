import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableDiscountManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import * as actions from '../../store/actions/index'
class TableDiscountManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableDiscount: [],
            columns: [{
                name: "Discount ID",
                selector: 'discountId',
                sortable: true,
            },
            {
                name: "Name",
                selector: 'name',
            },
            {
                name: "Start",
                selector: "start",
            },
            {
                name: "End",
                selector: "end",
            },
            {
                name: "State",
                selector: "state",
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>

                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditDiscount(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteDiscount(row) }}
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
            dataTableBook: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditDiscount = (row) => {
        this.props.getDiscountEdit(row.discountId)
        this.props.toggleDiscountEditModal();
    }
    handleDeleteDiscount = (row) => {
        this.props.getDiscountDelete(row.discountId)
        this.props.toggleDiscountDeleteModal();
    }
    componentDidMount() {
        this.props.fetchAllDiscounts()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDiscounts !== this.props.listDiscounts) {
            let arr = []
            this.props.listDiscounts.map((item, index) => {
                arr.push({
                    "discountId": item.discountId,
                    "name": item.name,
                    "state": item.state,
                    "start": item.start,
                    "end": item.end,
                    "percentage": item.end,
                })
            })
            this.setState({
                dataTableDiscount: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                let arr = []
                this.props.listDiscounts.map((item, index) => {
                    arr.push({
                        "discountId": item.discountId,
                        "name": item.name,
                        "state": item.state,
                        "start": item.start,
                        "end": item.end,
                        "percentage": item.end,
                    })
                })
                this.setState({
                    dataTableDiscount: arr,
                    optionSearch: this.props.optionSearch

                })
            }
            else {
                let listDiscountFilter = this.props.listDiscounts.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                let arr = []
                listDiscountFilter.map((item, index) => {
                    arr.push({
                        "discountId": item.discountId,
                        "name": item.name,
                        "state": item.state,
                        "start": item.start,
                        "end": item.end,
                        "percentage": item.end,
                    })
                })
                this.setState({
                    dataTableDiscount: arr,
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
                    data={this.state.dataTableDiscount}
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
        listDiscounts: state.discount.listDiscounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDiscounts: () => dispatch(actions.fetchAllDiscountsStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDiscountManage);
