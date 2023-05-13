import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../src/utils"
import "./ModalUser.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import { data } from 'jquery';
import * as actions from '../../store/actions/index'
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: "",
            gender: "",
            role: "",
            phonenumber: "",
            email: "",
            birthDay: "",
            username: "",
            password: "",
            startWork: "",
            address: "",
            image: "",
            previewImgURL: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: "",
                gender: "",
                role: "",
                phonenumber: "",
                email: "",
                birthDay: "",
                username: "",
                password: "",
                startWork: "",
                address: "",
                image: "",
                previewImgURL: ""
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
            'name',
            'gender',
            'role',
            'phonenumber',
            'email',
            'birthDay',
            'username',
            'password',
            'startWork',
            'address',
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(
                {
                    name: this.state.name,
                    gender: this.state.gender,
                    role: this.state.role,
                    phonenumber: this.state.phonenumber,
                    email: this.state.email,
                    birthDay: this.state.birthDay,
                    username: this.state.username,
                    password: this.state.password,
                    startWork: this.state.startWork,
                    address: this.state.address,
                    image: this.state.image,
                }
            )
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.toggle()
        }
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleOnchangeDatePicker = (date, id) => {
        let copyState = { ...this.state }
        copyState[id] = date[0]
        this.setState({
            ...copyState
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body d-flex'>
                        <div className='content-right ml-3' style={{ "width": "30%" }} >
                            <div className='preview-img-container input-container'>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})`, "height": "100%" }}
                                    onClick={() => { this.openPreviewImage() }}
                                >
                                </div>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='label-upload text-center' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                            </div>
                            <div className='input-container'>
                                <label>Day of birth</label>
                                <DatePicker
                                    onChange={(e) => this.handleOnchangeDatePicker(e, 'birthDay')}
                                    value={this.state.birthDay}
                                />
                            </div>
                            <div className='input-container'>
                                <label>Start Work</label>
                                <DatePicker
                                    onChange={(e) => this.handleOnchangeDatePicker(e, 'startWork')}
                                    value={this.state.startWork}
                                />
                            </div>
                        </div>
                        <div className='content-left' style={{ "width": "60%" }}>
                            <div className='input-container'>
                                <label>Name</label>
                                <input
                                    type='text'
                                    value={this.state.name}
                                    onChange={(e) => this.handleOnchangeInput(e, 'name')}
                                />
                            </div>
                            <div
                                className='d-flex'
                            >
                                <div className='input-container mr-4' style={{ "width": "48%" }}>
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
                                <div className='input-container' style={{ "width": "48%" }}>
                                    <label>Role</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.role}
                                            onChange={(e) => this.handleOnchangeInput(e, 'role')}
                                        >
                                            <option value={'Manager'}>Manager</option>
                                            <option value={"Employee"}>Employee</option>
                                            <option value={"Supporter"}>Supporter</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='input-container mr-4' style={{ "width": "48%" }}>
                                    <label>Phone Number</label>
                                    <input
                                        type='text'
                                        value={this.state.phonenumber}
                                        onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                    />
                                </div>
                                <div className='input-container' style={{ "width": "48%" }}>
                                    <label>Email</label>
                                    <input
                                        type='text'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='input-container mr-4' style={{ "width": "48%" }}>
                                    <label>User Name</label>
                                    <input
                                        type='text'
                                        value={this.state.username}
                                        onChange={(e) => this.handleOnchangeInput(e, 'username')}
                                    />
                                </div>
                                <div className='input-container' style={{ "width": "48%" }}>
                                    <label>Password</label>
                                    <input
                                        type='text'
                                        value={this.state.password}
                                        onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                    />
                                </div>
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewUser()}
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
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
