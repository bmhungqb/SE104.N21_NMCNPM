import React, { Component, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions/appActions';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalInventory.scss"
import DataTable from 'react-data-table-component';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index'
import { EmitFlags } from 'typescript';
import { CSVLink, CSVDownload } from "react-csv";
class ModalInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateInventory: undefined,
            dataTableBookSelect: [],
        }
    }
    componentDidMount() {
        this.props.getBookReports(this.props.dateInventory)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataBookReport !== this.props.dataBookReport) {
            let data = []
            this.props.dataBookReport.forEach(element => {
                if (element) {
                    data.push({
                        bookId: element["bookId"],
                        bookTitle: element["bookTitle"],
                        beginningStock: element["beginningStock"],
                        phatSinh: element["phatSinh"],
                        endingStock: element["endingStock"]
                    })
                }
            });
            this.setState({
                dataTableBookSelect: data
            })
        }
        if (prevState.dateInventory !== this.props.dateInventory) {
            this.setState({
                dateInventory: this.props.dateInventory
            })
            this.props.getBookReports(this.props.dateInventory)
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleDownload = () => {
        <CSVLink data={this.state.dataTableBookSelect}>
        </CSVLink>
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    {<FormattedMessage id='homepage.inventory-report' />}
                </ModalHeader>
                <ModalBody>
                    <DataTable
                        columns={[
                            {
                                name: this.props.language === "en" ? "Book ID" : "Mã sách",
                                selector: 'bookId',
                                sortable: true,
                            },
                            {
                                name: this.props.language === "en" ? "Book Title" : "Tên sách",
                                selector: "bookTitle",
                            },
                            {
                                name: this.props.language === "en" ? "Begin Inventory" : "Tồn đầu",
                                selector: "beginningStock",
                            },
                            {
                                name: this.props.language === "en" ? "Sold Quantity" : "Phát sinh",
                                selector: "phatSinh",
                            },
                            {
                                name: this.props.language === "en" ? "End Inventory" : "Tồn cuối",
                                selector: "endingStock",
                            },
                        ]}
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                </ModalBody>
                <ModalFooter>
                    <CSVLink data={this.state.dataTableBookSelect}>
                        <Button
                            style={{ "height": "40px", "width": "150px" }}
                            className='px-5 border-0 bg-danger'
                        >{<FormattedMessage id='homepage.download' />}
                        </Button>
                    </CSVLink>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary' onClick={() => { this.toggle() }}>{<FormattedMessage id='homepage.cancel' />}</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        dataBookReport: state.statistic.dataBookReport,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookReports: (month) => dispatch(actions.getBookReports(month)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInventory);
