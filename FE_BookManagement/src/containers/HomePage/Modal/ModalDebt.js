import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalInventory.scss"
import DataTable from 'react-data-table-component';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index'
import { EmitFlags, couldStartTrivia } from 'typescript';
class ModalInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateDept: undefined,
            dataTableBookSelect: [],
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataDebtReport !== this.props.dataDebtReport) {
            let data = []
            this.props.dataDebtReport.forEach(element => {
                if (element) {
                    data.push({
                        customerId: element["customerId"],
                        beginningDept: element["beginningDept"],
                        phatSinh: element["phatSinh"],
                        endingDept: element["endingDept"]
                    })
                }
            });
            this.setState({
                dataTableBookSelect: [...data]
            })
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    {<FormattedMessage id='homepage.debt-report' />}
                </ModalHeader>
                <ModalBody>
                    <DataTable
                        columns={[
                            {
                                name: this.props.language === "en" ? "Customer ID" : "Mã khách hàng",
                                selector: 'customerId',
                                sortable: true,
                            },
                            {
                                name: this.props.language === "en" ? "Begin Debt" : "Nợ đầu",
                                selector: "beginningDept",
                            },
                            {
                                name: this.props.language === "en" ? "Debt" : "Phát sinh",
                                selector: "phatSinh",
                            },
                            {
                                name: this.props.language === "en" ? "End Debt" : "Nợ cuối",
                                selector: "endingDept",
                            },
                        ]}
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.handleDownload() }}>{<FormattedMessage id='homepage.download' />}</Button>
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
        dataRentReport: state.statistic.dataRentReport,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInventory);
