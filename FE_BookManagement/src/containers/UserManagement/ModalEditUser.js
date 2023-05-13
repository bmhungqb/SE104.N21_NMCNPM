import React, { Component, useReducer } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditUser.scss"
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../src/utils"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import * as actions from '../../store/actions/index'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
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
            errMessage: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        let userInfor;
        this.props.listUsers.forEach(row => {
            if (row.id === this.props.userEditId) {
                userInfor = row
                return
            }
        });
        if (userInfor && !_.isEmpty(userInfor)) {
            let imageBase64 = "";
            if (userInfor.image) {
                imageBase64 = Buffer.from(userInfor.image, 'base64').toString('binary');
            }
            this.setState({
                id: userInfor.id,
                name: userInfor.name,
                gender: userInfor.gender,
                role: userInfor.role,
                phonenumber: userInfor.phonenumber,
                email: userInfor.email,
                birthDay: userInfor.birthDay,
                username: userInfor.username,
                password: userInfor.password,
                startWork: userInfor.startWork,
                address: userInfor.address,
                image: userInfor.image,
                previewImgURL: imageBase64
            })
        }
    }
    handleCancelEdit = () => {
        let userInfor;
        this.props.listUsers.forEach(row => {
            if (row.id === this.props.userEditId) {
                userInfor = row
                return
            }
        });
        if (userInfor && !_.isEmpty(userInfor)) {
            this.setState({
                ...this.props.listUsers,
                previewImgURL: ''
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
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.toggleEdit();
            this.props.editAUser(this.state)
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
    handleOnchangeDatePicker = (date, id) => {
        let copyState = { ...this.state }
        copyState[id] = date[0]
        this.setState({
            ...copyState
        })
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
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit user information</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body d-flex'>
                        <div className='content-right ml-3' style={{ "width": "30%" }} >
                            <div className='preview-img-container input-container'>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})`, "height": "100%" }}
                                    onClick={() => { this.openPreviewImage() }}
                                >
                                </div>
                                <input
                                    disabled={!this.state.isAllowEdit} id='previewImg' type='file' hidden
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
                                    disabled={!this.state.isAllowEdit}
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
                                            disabled={!this.state.isAllowEdit}
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
                                            disabled={!this.state.isAllowEdit}
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.phonenumber}
                                        onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                    />
                                </div>
                                <div className='input-container' style={{ "width": "48%" }}>
                                    <label>Email</label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.username}
                                        onChange={(e) => this.handleOnchangeInput(e, 'username')}
                                    />
                                </div>
                                <div className='input-container' style={{ "width": "48%" }}>
                                    <label>Password</label>
                                    <input
                                        disabled={true}
                                        type='password'
                                        value={this.state.password}
                                    // onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                    />
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Address</label>
                                <input
                                    disabled={!this.state.isAllowEdit}
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
                            onClick={() => this.handleSaveUser()}
                        >Save</Button>
                    }
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.users.listUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editAUser: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
