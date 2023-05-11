import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableUserManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
class TableEmployeeManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableEmployee: [],
            columns: [{
                name: "Employee ID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Full Name",
                selector: 'name',
            },
            {
                name: "Gender",
                selector: "gender",
            },
            {
                name: "Role",
                selector: "role",
            },
            {
                cell:
                    (row) =>
                        < button
                            className='border-0 bg-transparent'
                            onClick={() => { this.handleEditEmployee(row) }}
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
                        onClick={() => { this.handleDeleteEmployee(row) }}
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

    handleEditEmployee = (row) => {
        this.props.getEmployeeEdit(row)
        this.props.toggleEmployeeEditModal();
    }
    handleDeleteEmployee = (row) => {
        this.props.getEmployeeDelete(row.id)
        this.props.toggleEmployeeDeleteModal();
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
        if (prevProps.arrEmployees != this.props.arrEmployees) {
            let arr = []
            this.props.arrEmployees.map((item, index) => {
                const newObject = {}
                newObject.id = item["id"]
                newObject.name = item["lastName"] + " " + item["fistName"]
                newObject.gender = item["gender"]
                newObject.role = item["role"]
                arr.push(newObject)
            })
            this.setState({
                dataTableEmployee: arr
            })
        }
    }
    render() {
        return (
            <Fragment>
                <DataTable
                    columns={this.state.columns}
                    data={this.state.dataTableEmployee}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableEmployeeManage);
