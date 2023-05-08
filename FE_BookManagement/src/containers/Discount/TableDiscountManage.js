import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableDiscountManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
class TableDiscountManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableDiscount: [],
            columns: [{
                name: "Discount ID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
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
                cell:
                    (row) =>
                        < button
                            className='border-0 bg-transparent'
                            onClick={() => { this.handleEditDiscount(row) }}
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
                        onClick={() => { this.handleDeleteDiscount(row) }}
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

    handleEditDiscount = (row) => {
        this.props.getDiscountEdit(row)
        this.props.toggleDiscountEditModal();
    }
    handleDeleteDiscount = (row) => {
        this.props.getDiscountDelete(row.id)
        this.props.toggleDiscountDeleteModal();
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
        if (prevProps.arrDiscounts != this.props.arrDiscounts) {
            let arr = []
            this.props.arrDiscounts.map((item, index) => {
                arr.push(item)
            })
            this.setState({
                dataTableDiscount: arr
            })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDiscountManage);
