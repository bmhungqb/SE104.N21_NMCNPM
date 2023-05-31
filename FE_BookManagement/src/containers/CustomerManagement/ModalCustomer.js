import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalCustomer.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import * as actions from '../../store/actions/index'
class ModalCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            customerState: "",
            gender: "",
            phoneNumber: "",
            address: "",
            email: "",
            birthDay: "",
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
                gender: "",
                phoneNumber: "",
                address: "",
                email: "",
                birthDay: "",
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
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'firstName',
            'lastName',
            'customerState',
            'gender',
            'phoneNumber',
            'address',
            'email',
            'birthDay'
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
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
            this.toggle()
        }
    }
    componentDidMount() {

    }

    toggle = () => {
        // emitter.emit('EVENT_CLEAR_MODAL_DATA')
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-customer-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new customer</ModalHeader>
                <ModalBody>
                    <div className='modal-customer-body'>
                        <div
                            className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>First Name</label>
                            <input
                                type='text'
                                style={{ "width": "80%" }}
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Last Name</label>
                            <input
                                type='text'
                                style={{ "width": "80%" }}
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                            />
                        </div>

                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Gender</label>
                            <div className='select-genre'>
                                <select
                                    style={{ "width": "60%" }}
                                    className='form-select'
                                    value={this.state.gender}
                                    onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                >
                                    <option value={"Male"}>Male</option>
                                    <option value={'Female'}>Female</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Date of birth</label>
                            <DatePicker
                                style={{ "width": "60%" }}
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.birthDay}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Phone Number</label>
                            <input
                                style={{ "width": "60%" }}
                                type='text'
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Address</label>
                            <input
                                style={{ "width": "80%" }}
                                type='text'
                                value={this.state.address}
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Email</label>
                            <input
                                style={{ "width": "80%" }}
                                type='text'
                                value={this.state.email}
                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Customer State</label>
                            <div className='select-genre'>
                                <select
                                    style={{ "width": "60%" }}
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
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
        createNewCustomer: (data) => dispatch(actions.createNewCutomer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCustomer);
