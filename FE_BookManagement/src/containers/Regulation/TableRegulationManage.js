import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableRegulationManage.scss";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import * as actions from '../../store/actions/index'
class TableRegulationManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableRegulation: [],
            columns: [{
                name: "Regulation ID",
                selector: 'id',
                sortable: true,
                sortFunction: this.caseInsensitiveSort,
            },
            {
                name: "Description",
                selector: 'description',
            },
            {
                name: "Type of constraint",
                selector: "typeConstraint",
            },
            {
                name: "Constraint",
                selector: "constraint",
            },
            {
                name: "Actions",
                cell:
                    (row) =>
                        <div
                            className='d-flex justify-content-between w-75'>

                            < button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleEditRegulation(row) }}
                                data-tag="allowRowEvents"
                            >
                                <FontAwesomeIcon
                                    className='icon-right text-primary'
                                    icon={faPenToSquare}
                                />
                            </button >
                            <button
                                className='border-0 bg-transparent'
                                onClick={() => { this.handleDeleteRegulation(row) }}
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

    handleEditRegulation = (row) => {
        this.props.getRegulationEdit(row.id)
        this.props.toggleRegulationEditModal();
    }
    handleDeleteRegulation = (row) => {
        this.props.getRegulationDelete(row.id)
        this.props.toggleRegulationDeleteModal();
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
        this.props.fetchAllRegulations()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listRegulations !== this.props.listRegulations) {
            let arr = []
            this.props.listRegulations.map((item, index) => {
                arr.push({
                    "id": item.id,
                    "description": item.description,
                    "typeConstraint": item.typeConstraint,
                    "constraint": item.constraint,
                })
            })
            this.setState({
                dataTableRegulation: arr
            })
        }
        if (prevProps.optionSearch != this.props.optionSearch) {
            if (this.props.optionSearch[0] === "") {
                let arr = []
                this.props.listRegulations.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "description": item.description,
                        "typeConstraint": item.typeConstraint,
                        "constraint": item.constraint,
                    })
                })
                this.setState({
                    dataTableRegulation: arr,
                    optionSearch: this.props.optionSearch

                })
            }
            else {
                let listRegulationFilter = this.props.listRegulations.filter(row => row[this.props.optionSearch[1]].toString().toLowerCase().includes(this.props.optionSearch[0].toLowerCase()))
                let arr = []
                listRegulationFilter.map((item, index) => {
                    arr.push({
                        "id": item.id,
                        "description": item.description,
                        "typeConstraint": item.typeConstraint,
                        "constraint": item.constraint,
                    })
                })
                this.setState({
                    dataTableRegulation: arr,
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
                    data={this.state.dataTableRegulation}
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
        listRegulations: state.regulation.listRegulations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRegulations: () => dispatch(actions.fetchAllRegulationsStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRegulationManage);
