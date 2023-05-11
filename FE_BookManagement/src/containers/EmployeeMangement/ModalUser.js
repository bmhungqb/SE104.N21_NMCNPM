import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalUser.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            role: "",
            phoneNumber: "",
            email: "",
            birthday: "",
            userName: "",
            password: "",
            startWork: "",
            address: "",
            image: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                firstName: "",
                lastName: "",
                gender: "",
                role: "",
                phoneNumber: "",
                email: "",
                birthday: "",
                userName: "",
                password: "",
                startWork: "",
                address: "",
                image: "",
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
            'gender',
            'role',
            'phoneNumber',
            'email',
            'birthday',
            'userName',
            'password',
            'startWork',
            'address',
            'image',
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
    handleAddNewEmployee = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewEmployee(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Add new employee</ModalHeader>
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
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Gender</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.gender}
                                    onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                >
                                    <option value={'Male'}>Male</option>
                                    <option value={"Female"}>Female</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container '>
                            <label>Role</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.role}
                                    onChange={(e) => this.handleOnchangeInput(e, 'role')}
                                >
                                    <option value={'Manager'}>Manager</option>
                                    <option value={"Admin"}>Admin</option>
                                    <option value={"Supporter"}>Supporter</option>
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
                        <div className='input-container '>
                            <label>Email</label>
                            <input
                                type='text'
                                value={this.state.email}
                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Day of birth</label>
                            <input
                                type='text'
                                value={this.state.birthday}
                                onChange={(e) => this.handleOnchangeInput(e, 'birthday')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>User Name</label>
                            <input
                                type='text'
                                value={this.state.userName}
                                onChange={(e) => this.handleOnchangeInput(e, 'userName')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='text'
                                value={this.state.password}
                                onChange={(e) => this.handleOnchangeInput(e, 'password')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Start Work</label>
                            <input
                                type='text'
                                value={this.state.startWork}
                                onChange={(e) => this.handleOnchangeInput(e, 'startWork')}
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewEmployee()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEmployee);
