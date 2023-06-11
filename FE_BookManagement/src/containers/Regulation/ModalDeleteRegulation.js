import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteRegulation.scss"
import * as actions from '../../store/actions/index'
class ModalDeleteRegulation extends Component {

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
    handleDeleteRegulation = () => {
        this.props.deleteARegulation(this.props.regulationDeleteId);
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
                ><FormattedMessage id='modal.title-delete-regulation' /></ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}>
                        <FormattedMessage id='modal.no' />
                    </Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteRegulation()}>
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
        deleteARegulation: (regulationId) => dispatch(actions.deleteARegulation(regulationId)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteRegulation);
