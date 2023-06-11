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
        this.props.getRegulationEdit(row.regulationId)
        this.props.toggleRegulationEditModal();
    }
    handleDeleteRegulation = (row) => {
        this.props.getRegulationDelete(row.regulationId)
        this.props.toggleRegulationDeleteModal();
    }
    componentDidMount() {
        this.props.fetchAllRegulations()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listRegulations !== this.props.listRegulations) {
            let arr = []
            this.props.listRegulations.map((item, index) => {
                arr.push({
                    "regulationId": item.regulationId,
                    "name": item.name,
                    "minimumInput": item.minimumInput === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
                    "minimumStock": item.minimumStock === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
                    "maximumDept": item.maximumDept === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
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
                        "regulationId": item.regulationId,
                        "name": item.name,
                        "minimumInput": item.minimumInput === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
                        "minimumStock": item.minimumStock === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
                        "maximumDept": item.maximumDept === 1 ? this.props.language === "en" ? "Active" : "Bật" : this.props.language === "en" ? "None" : "Không có",
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
                        "regulationId": item.regulationId,
                        "name": item.name,
                        "minimumInput": item.minimumInput,
                        "minimumStock": item.minimumStock,
                        "maximumDept": item.maximumDept,
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
                    columns={
                        [{
                            name: this.props.language === "en" ? "Regulation ID" : "Mã quy định",
                            selector: 'regulationId',
                            sortable: true,
                        },
                        {
                            name: this.props.language === "en" ? "Name" : "Tên quy định",
                            selector: 'name',
                        },
                        {
                            name: this.props.language === "en" ? "Minimum Input" : "Lượng nhập tối thiểu",
                            selector: "minimumInput",
                            cell:
                                (row) =>
                                    < div
                                        style={row.minimumInput === "Active" || row.minimumInput === "Bật" ?
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "green" } :
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "red" }
                                        }
                                    >
                                        {row.minimumInput}
                                    </div >
                        },
                        {
                            name: this.props.language === "en" ? "Minimum Stock" : "Kho tồn tối thiểu",
                            selector: "minimumStock",
                            cell:
                                (row) =>
                                    < div
                                        style={row.minimumStock === "Active" || row.minimumStock === "Bật" ?
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "green" } :
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "red" }
                                        }
                                    >
                                        {row.minimumStock}
                                    </div >
                        },
                        {
                            name: this.props.language === "en" ? "Maximum Dept" : "Nợ tối đa",
                            selector: "maximumDept",
                            cell:
                                (row) =>
                                    < div
                                        style={row.maximumDept === "Active" || row.maximumDept === "Bật" ?
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "green" } :
                                            { "color": "white", "border-radius": "4px", "alignItems": "center", "justifyContent": "center", "display": "flex", "height": "22px", "width": "70px", "background": "red" }
                                        }
                                    >
                                        {row.maximumDept}
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
                        ]
                    }
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
        listRegulations: state.regulation.listRegulations,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRegulations: () => dispatch(actions.fetchAllRegulationsStart()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRegulationManage);
