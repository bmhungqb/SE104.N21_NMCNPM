import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditCustomer.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import * as actions from '../../store/actions/index'
class ModalEditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            firstName: "",
            lastName: "",
            customerState: "",
            gender: "",
            phoneNumber: "",
            address: "",
            email: "",
            birthDay: "",
            errMessage: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        let customerInfor;
        this.props.listCustomers.forEach(row => {
            if (row.id === this.props.customerEditId) {
                customerInfor = row
                return
            }
        });
        if (customerInfor && !_.isEmpty(customerInfor)) {
            this.setState({
                id: customerInfor.id,
                firstName: customerInfor.firstName,
                lastName: customerInfor.lastName,
                customerState: customerInfor.customerState,
                gender: customerInfor.gender,
                phoneNumber: customerInfor.phoneNumber,
                address: customerInfor.address,
                email: customerInfor.email,
                birthDay: customerInfor.birthDay,
            })
        }
    }
    handleCancelEdit = () => {
        let customerInfor;
        this.props.listCustomers.forEach(row => {
            if (row.id === this.props.customerEditId) {
                customerInfor = row
                return
            }
        });
        if (customerInfor && !_.isEmpty(customerInfor)) {
            this.setState({
                ...this.props.listCustomers
            })
        }
        this.toggleEdit()
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
            'gender',
            'phoneNumber',
            'address',
            'email',
            'birthDay',
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
    handleSaveCustomer = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.toggleEdit();
            this.props.editACustomer(this.state)
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleEdit = () => {
        this.setState({
            isAllowEdit: !this.state.isAllowEdit
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-customer-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit customer information</ModalHeader>
                <ModalBody>
                    <div className='modal-customer-body'>
                        <div
                            className='input-container'
                            style={{ "width": "100%" }}
                        >
                            <label>Customer ID</label>
                            <input
                                disabled={true}
                                type='text'
                                style={{ "width": "15%" }}
                                value={this.state.id}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>First Name</label>
                            <input
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                                    disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
                                style={{ "width": "60%" }}
                                onChange={(date) => this.handleOnchangeDatePicker(date)}
                                value={this.state.birthDay}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Phone Number</label>
                            <input
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                                    disabled={!this.state.isAllowEdit}
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
                        className={this.state.isAllowEdit ? 'px-5 border-0 bg-success d-none' : 'px-5 border-0 bg-success'}
                        onClick={() => { this.toggleEdit() }}
                    >Edit</Button>
                    {
                        this.state.isAllowEdit
                        &&
                        <Button
                            style={{ "height": "40px", "width": "150px" }}
                            className='px-5 border-0 bg-danger' onClick={() => { this.handleCancelEdit() }}
                        >Cancel</Button>
                    }
                    {
                        this.state.isAllowEdit &&
                        <Button
                            style={{ "height": "40px", "width": "150px" }}
                            className='px-5 border-0 bg-primary'
                            onClick={() => this.handleSaveCustomer()}
                        >Save</Button>
                    }
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listCustomers: state.customer.listCustomers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editACustomer: (data) => dispatch(actions.editACustomer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCustomer);
