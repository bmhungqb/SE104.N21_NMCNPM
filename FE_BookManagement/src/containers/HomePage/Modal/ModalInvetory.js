import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalInventory.scss"
import DataTable from 'react-data-table-component';
import actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index'
class ModalInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTableBookSelect: [],
            columns: [
                {
                    name: "Book ID",
                    selector: 'bookId',
                    sortable: true,
                },
                {
                    name: "Book Title",
                    selector: "bookTitle",
                },
                {
                    name: "Begin Inventory",
                    selector: "beginningStock",
                },
                {
                    name: "Sold Quantity",
                    selector: "phatSinh",
                },
                {
                    name: "End Inventory",
                    selector: "endingStock",
                },
            ],
        }
    }
    componentDidMount() {
        this.props.getBookReports(6)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataBookReport !== this.props.dataBookReport) {
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
                <ModalHeader toggle={() => { this.toggle() }}>Inventory Report</ModalHeader>
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
        dataBookReport: state.statistic.dataBookReport
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookReports: (month) => dispatch(actions.getBookReports(month))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInventory);
