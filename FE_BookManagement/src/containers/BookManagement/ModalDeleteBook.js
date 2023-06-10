import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteBook.scss"
import * as actions from '../../store/actions/index'
class ModalDeleteBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    handleDeleteBook = () => {
        this.props.deleteABook(this.props.bookDeleteId);
        this.toggle()
    }
    toggle = () => {
        this.props.toggleFromParent();
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
                >
                    <FormattedMessage id='modal.title-delete' />
                </ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => { this.toggle() }}><FormattedMessage id='modal.no' /></Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => this.handleDeleteBook()}><FormattedMessage id='modal.yes' /></Button>
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
        deleteABook: (bookId) => dispatch(actions.deleteABook(bookId)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteBook);
