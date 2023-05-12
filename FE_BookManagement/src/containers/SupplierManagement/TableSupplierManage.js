import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableSupplierManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import * as actions from "../../store/actions/index"
class TableSupplierManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "Supplier ID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Name",
                selector: 'name',
            },
            {
                name: "Phone Number",
                selector: "phoneNumber",
            },
            {
                name: "Email",
                selector: "email",
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>

                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditSupplier(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteSupplier(row) }}
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
            dataTableSupplier: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditSupplier = (row) => {
        this.props.getSupplierEdit(row.id)
        this.props.toggleSupplierEditModal();
    }
    handleDeleteSupplier = (row) => {
        this.props.getSupplierDelete(row.id)
        this.props.toggleSupplierDeleteModal();
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
        this.props.fetchAllSuppliers()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSuppliers !== this.props.listSuppliers) {
            let arr = []
            this.props.listSuppliers.map((item, index) => {
                arr.push({
                    "id": item.id,
                    "name": item.name,
                    "address": item.address,
                    "email": item.email,
                    "phoneNumber": item.phoneNumber,
                })
            })
            this.setState({
                dataTableSupplier: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                let arr = []
                this.props.listSuppliers.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "name": item.name,
                        "address": item.address,
                        "email": item.email,
                        "phoneNumber": item.phoneNumber,
                    })
                })
                this.setState({
                    dataTableSupplier: arr,
                    optionSearch: this.props.optionSearch

                })
            }
            else {
                let listSupplierFilter = this.props.listSuppliers.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                let arr = []
                listSupplierFilter.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "name": item.name,
                        "address": item.address,
                        "email": item.email,
                        "phoneNumber": item.phoneNumber,
                    })
                })
                this.setState({
                    dataTableSupplier: arr,
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
                    data={this.state.dataTableSupplier}
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
        listSuppliers: state.supplier.listSuppliers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSuppliers: () => dispatch(actions.fetchAllSuppliersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSupplierManage);
