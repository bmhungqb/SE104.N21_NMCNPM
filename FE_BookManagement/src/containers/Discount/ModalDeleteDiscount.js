import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteDiscount.scss"
import { FormattedMessage } from 'react-intl';
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
                ><FormattedMessage id='modal.title-delete-discount' /></ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}>
                        <FormattedMessage id='modal.no' />
                    </Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteDiscount()}>
                        <FormattedMessage id='modal.yes' />
                    </Button>
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
        deleteADiscount: (discountId) => dispatch(actions.deleteADiscount(discountId)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteDiscount);
