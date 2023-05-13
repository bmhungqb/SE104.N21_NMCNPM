import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableUserManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import * as actions from '../../store/actions/index'
class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "User ID",
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
                cell:
                    (row) =>
                        < div
                            style={row.role === "Employee" ?
                                { "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#87CEFA" } :
                                row.role === "Manager" ? { "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#DC143C" } :
                                    { "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "#FFD700" }
                            }
                        >
                            {row.role}
                        </div >
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>

                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditUser(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteUser(row) }}
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
            dataTableUser: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }
        }
    }

    handleEditUser = (row) => {
        this.props.getUserEdit(row.id)
        this.props.toggleUserEditModal();
    }
    handleDeleteUser = (row) => {
        this.props.getUserDelete(row.id)
        this.props.toggleUserDeleteModal();
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
        this.props.fetchAllUsers()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            let arr = []
            this.props.listUsers.map((item, index) => {
                arr.push({
                    "id": item.id,
                    "name": item.name,
                    "gender": item.gender,
                    "role": item.role,
                })
            })
            this.setState({
                dataTableUser: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                let arr = []
                this.props.listUsers.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "name": item.name,
                        "gender": item.gender,
                        "role": item.role,
                    })
                })
                this.setState({
                    dataTableUser: arr,
                    optionSearch: this.props.optionSearch

                })
            }
            else {
                let listUserFilter = this.props.listUsers.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                let arr = []
                listUserFilter.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "name": item.name,
                        "gender": item.gender,
                        "role": item.role,
                    })
                })
                this.setState({
                    dataTableUser: arr,
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
                    data={this.state.dataTableUser}
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
        listUsers: state.users.listUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
