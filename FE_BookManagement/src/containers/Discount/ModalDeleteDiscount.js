import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteDiscount.scss"
import * as actions from '../../store/actions/index'
class ModalDeleteDiscount extends Component {

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
    handleDeleteDiscount = () => {
        this.props.deleteADiscount(this.props.discountDeleteId);
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
                >Do you want to delete this discount?</ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}>No</Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteDiscount()}>Yes</Button>
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
        deleteADiscount: (discountId) => dispatch(actions.deleteADiscount(discountId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteDiscount);
