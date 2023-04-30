import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableUserManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                name: "Title",
                selector: row => row.title,
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Year",
                selector: row => row.year,
            }
                ,
            {
                name: "Year2",
                selector: row => row.year,
            }
                ,
            {
                name: "Year3",
                selector: row => row.year,
            }
                ,
            {
                name: "Year4",
                selector: row => row.year,
            }
                ,
            {
                name: "Year5",
                selector: row => row.year,
            },
            {
                cell: () => <button
                    onClick={() => { this.handleEditBook() }}
                >
                    <FontAwesomeIcon className='icon-right' icon={faPenToSquare} />
                </button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            {
                cell: () => <button
                    onClick={() => { this.handleDeleteBook() }}
                >
                    <FontAwesomeIcon className='icon-right' icon={faTrash} />
                </button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            }
            ],
            data: [{

                id: 1,
                title: "buh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buinh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 3,
                title: "buimanh ng",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 4,
                title: "buimanung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 5,
                title: "buimanh h",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 6,
                title: "imanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "h hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
            },
            {
                id: 2,
                title: "buimanh hung",
                year: '2003',
                year1: '2003',
                year2: '2003',
                year3: '2003',
                year4: '2003',
                year5: '2003',
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

    handleEditBook = () => {
        this.props.toggleFromParent();
    }
    handleDeleteBook = () => {
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
                    fixedHeaderScrollHeight="457px"
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

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
