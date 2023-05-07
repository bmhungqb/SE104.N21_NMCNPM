import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDeleteBook.scss"
class ModalDeleteBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    handleDeleteBook = () => {
        this.props.deleteBook();
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
                >Do you want to delete this book?</ModalHeader>
                <ModalFooter>
                    <Button className='px-5  border-0 bg-danger' onClick={() => this.handleDeleteBook()}>Yes</Button>
                    <Button className='px-5  border-0 bg-primary' onClick={() => { this.toggle() }}>No</Button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteBook);
