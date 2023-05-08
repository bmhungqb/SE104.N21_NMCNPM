import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableSupplierManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
class TableSupplierManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableSupplier: [],
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
                name: "Email",
                selector: "email",
            },
            {
                name: "Phone Number",
                selector: "phoneNumber",
            },
            {
                cell:
                    (row) =>
                        < button
                            className='border-0 bg-transparent'
                            onClick={() => { this.handleEditSupplier(row) }}
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
                        onClick={() => { this.handleDeleteSupplier(row) }}
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
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditSupplier = (row) => {
        this.props.getSupplierEdit(row)
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
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrSuppliers != this.props.arrSuppliers) {
            let arr = []
            this.props.arrSuppliers.map((item, index) => {
                arr.push(item)
            })
            this.setState({
                dataTableSupplier: arr
            })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSupplierManage);
