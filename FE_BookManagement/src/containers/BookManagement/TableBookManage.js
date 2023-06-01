import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableBookManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faPlugCircleMinus, faPlugCirclePlus, faPlus, faPlusCircle, faPlusMinus, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import { includes } from 'lodash';
import * as actions from "../../store/actions/index"
class TableBookManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "BookID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "BookTitle",
                selector: 'bookTitle',
            },
            {
                name: "Author",
                selector: "authorName",
            },
            {
                name: "Genre",
                selector: "genre",
            },
            {
                name: "Quantity",
                selector: "quantity",
            },
            {
                cell:
                    (row) =>
                        <>
                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditBook(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            < button
                                style={{ "margin": "0 10px" }}
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleInputBook(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-success'
                                    icon={faPlusCircle}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteBook(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-danger'
                                    icon={faTrash}
                                />
                            </button>
                        </>
                ,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            }
            ],
            optionSearch: [],
            dataTableBook: [],
            dataFull: [],
            paginationComponentOptions: {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            },

        }
    }

    handleEditBook = (row) => {
        this.props.getBookEdit(row.id)
        this.props.toggleFromParent('edit');
    }
    handleInputBook = (row) => {
        this.props.getBookEdit(row.id)
        this.props.toggleFromParent('input');
    }
    handleDeleteBook = (row) => {
        this.props.getBookDelete(row.id)
        this.props.toggleBookDeleteModal();
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
        this.props.fetchAllBooks()
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBooks !== this.props.listBooks) {
            let arr = []
            this.props.listBooks.map((item, index) => {
                arr.push(item)
            })
            this.setState({
                dataTableBook: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                this.setState({
                    dataTableBook: this.props.listBooks,
                    optionSearch: this.props.optionSearch
                })
            }
            else {
                const arr = this.props.listBooks.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                this.setState({
                    dataTableBook: arr,
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
                    data={this.state.dataTableBook}
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
        listBooks: state.admin.listBooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooks: () => dispatch(actions.fetchAllBooksStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBookManage);
