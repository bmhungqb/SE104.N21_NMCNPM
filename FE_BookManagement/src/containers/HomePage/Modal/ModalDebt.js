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
            columns: [
                {
                    name: "Customer ID",
                    selector: 'customerId',
                    sortable: true,
                },
                {
                    name: "Begin Debt",
                    selector: "beginningDept",
                },
                {
                    name: "Debt",
                    selector: "phatSinh",
                },
                {
                    name: "End Debt",
                    selector: "endingDept",
                },
            ],
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
        console.log("check upadte: ", this.props.dataDebtReport)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Debt Report</ModalHeader>
                <ModalBody>
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.dataTableBookSelect}
                        fixedHeader
                        fixedHeaderScrollHeight="330px"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.handleDownload() }}>Download</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary' onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        dataRentReport: state.statistic.dataRentReport
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInventory);
