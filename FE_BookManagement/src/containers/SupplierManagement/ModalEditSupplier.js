import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditEmployee.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalEditEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
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
        }
    }
    componentDidMount() {
        let employeeInfor = this.props.employeeEdit
        if (employeeInfor && !_.isEmpty(employeeInfor)) {
            this.setState({
                id: employeeInfor.id,
                firstName: employeeInfor.firstName,
                lastName: employeeInfor.lastName,
                gender: employeeInfor.gender,
                role: employeeInfor.role,
                phoneNumber: employeeInfor.phoneNumber,
                email: employeeInfor.email,
                birthday: employeeInfor.birthday,
                userName: employeeInfor.userName,
                password: employeeInfor.password,
                startWork: employeeInfor.startWork,
                address: employeeInfor.address,
                image: employeeInfor.image,
            })
        }
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
    handleSaveEmployee = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editEmployee(this.state)
        }
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit customer information</ModalHeader>
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
                        onClick={() => this.handleSaveEmployee()}
                    >Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditEmployee);
