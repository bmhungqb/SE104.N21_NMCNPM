import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalCustomer.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            customerState: "",
            sex: "",
            phoneNumber: "",
            address: "",
            email: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                firstName: "",
                lastName: "",
                customerState: "",
                sex: "",
                phoneNumber: "",
                address: "",
                email: "",
            })
        })
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'firstName',
            'lastName',
            'customerState',
            'sex',
            'phoneNumber',
            'address',
            'email',
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter " + arrInput[i]);
                break;
            }
        }
        return isValid
    }
    handleAddNewCustomer = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewCustomer(this.state)
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
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new customer</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                type='text'
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Last Name</label>
                            <input
                                type='text'
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Customer State</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.customerState}
                                    onChange={(e) => this.handleOnchangeInput(e, 'customerState')}
                                >
                                    <option value={"Normal"}>Normal</option>
                                    <option value={'Vip'}>Vip</option>
                                    <option value={"Gold"}>Gold</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container '>
                            <label>Sex</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.sex}
                                    onChange={(e) => this.handleOnchangeInput(e, 'sex')}
                                >
                                    <option value={"Male"}>Male</option>
                                    <option value={'Female'}>Female</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input
                                type='text'
                                value={this.state.address}
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Email</label>
                            <input
                                type='text'
                                value={this.state.email}
                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewCustomer()}
                    >Add</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCustomer);
