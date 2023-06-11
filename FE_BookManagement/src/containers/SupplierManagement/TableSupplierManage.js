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
                    columns={
                        [
                            {
                                name: this.props.language === "en" ? "Supplier ID" : "Mã nhà cung cấp",
                                selector: 'id',
                                sortable: true,
                            },
                            {
                                name: this.props.language === "en" ? "Name" : "Tên nhà cung cấp",
                                selector: 'name',
                            },
                            {
                                name: this.props.language === "end" ? "Phone Number" : "Số điện thoại",
                                selector: "phoneNumber",
                            },
                            {
                                name: "Email",
                                selector: "email",
                            },
                            {
                                name: this.props.language === "en" ? "Actions" : "Chức năng",
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
                        ]}
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
        listSuppliers: state.supplier.listSuppliers,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSuppliers: () => dispatch(actions.fetchAllSuppliersStart()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSupplierManage);
