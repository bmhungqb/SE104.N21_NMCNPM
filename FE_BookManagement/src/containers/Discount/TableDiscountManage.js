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
                let start = new Date(Date.parse(item.start)).toLocaleDateString();
                let end = new Date(Date.parse(item.end)).toLocaleDateString();
                arr.push({
                    "discountId": item.discountId,
                    "name": item.name,
                    "state": item.state,
                    "start": start,
                    "end": end,
                    "percentage": item.percentage,
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
                    let start = new Date(Date.parse(item.start)).toLocaleDateString();
                    let end = new Date(Date.parse(item.end)).toLocaleDateString();
                    arr.push({
                        "discountId": item.discountId,
                        "name": item.name,
                        "state": item.state,
                        "start": start,
                        "end": end,
                        "percentage": item.percentage,
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
                    let start = new Date(Date.parse(item.start)).toLocaleDateString();
                    let end = new Date(Date.parse(item.end)).toLocaleDateString();
                    arr.push({
                        "discountId": item.discountId,
                        "name": item.name,
                        "state": item.state,
                        "start": start,
                        "end": end,
                        "percentage": item.percentage,
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
                    columns={
                        [{
                            name: this.props.language === "en" ? "Discount ID" : "Mã giảm giá",
                            selector: 'discountId',
                            sortable: true,
                        },
                        {
                            name: this.props.language === "en" ? "Name" : "Tên mã giảm giá",
                            selector: 'name',
                        },
                        {
                            name: this.props.language === "en" ? "Start" : "Ngày bắt đầu",
                            selector: "start",
                        },
                        {
                            name: this.props.language === "en" ? "End" : "Ngày hết hạn",
                            selector: "end",
                        },
                        {
                            name: this.props.language === "en" ? "State" : "Trạng thái",
                            selector: "state",
                            cell:
                                (row) =>
                                    < div
                                        style={row.state === "Active" ?
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "100px", "background": "green" } :
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "100px", "background": "red" }
                                        }
                                    >
                                        {row.state === "Active" ? this.props.language === "en" ? "Active" : "Còn hiệu lực" : this.props.language === "en" ? "End" : "Hết hạn"}
                                    </div >
                        },
                        {
                            name: this.props.language === "en" ? "Actions" : "Chức năng",
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
                        ]
                    }
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
        listDiscounts: state.discount.listDiscounts,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDiscounts: () => dispatch(actions.fetchAllDiscountsStart()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDiscountManage);
