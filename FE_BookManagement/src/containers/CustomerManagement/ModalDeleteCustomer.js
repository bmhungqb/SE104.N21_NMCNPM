import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteCustomer.scss"
import * as actions from '../../store/actions/index'
class ModalDeleteCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleDeleteCustomer = () => {
        this.props.deleteACustomer(this.props.customerDeleteId);
        this.toggle()
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-delete-container'}
                size='ms'
            >
                <ModalHeader
                ><FormattedMessage id='modal.title-delete-customer' /></ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}><FormattedMessage id='modal.no' /></Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteCustomer()}><FormattedMessage id='modal.yes' /></Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        deleteACustomer: (customerId) => dispatch(actions.deleteACustomer(customerId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteCustomer);
