import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalOrder.scss"
class ModalOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                // isOpen={true}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Book Information</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'>
                            <label>Name customer</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container '>
                            <label>Phone Number</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input
                                type='text'
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-5 border-0 bg-danger' >Clear</Button>
                    <Button className='px-5 border-0 bg-primary' onClick={() => { this.toggle() }}>Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);
