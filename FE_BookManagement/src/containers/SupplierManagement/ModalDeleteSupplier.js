import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteSupplier.scss"
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
    handleDeleteSupplier = () => {
        this.props.deleteASupplier(this.props.supplierDeleteId);
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
                >Do you want to delete this supplier?</ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}>No</Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteSupplier()}>Yes</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteASupplier: (supplierId) => dispatch(actions.deleteASupplier(supplierId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteCustomer);
