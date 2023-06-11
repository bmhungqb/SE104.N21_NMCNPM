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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
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

    componentDidMount = async () => {
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
                imageBase64 = new Buffer(userInfor.image, 'base64').toString('binary');
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
                previewImgURL: imageBase64,
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
    handleSaveUser = () => {
        this.toggleEdit();
        this.props.editAUser({
            id: this.state.id,
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
            image: this.state.previewImgURL,
        })
        this.toggle()
        resetForm();
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
            });
        }
    };
    handleChange = (e, values) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        values[e.target.name] = e.target.value
    }
    inputSchema = Yup.object().shape({
        phonenumber: Yup.number()
            .typeError("Must be a number type"),
        email: Yup.string().email(),
        username: Yup.string(),
        password: Yup.string(),
    })
    render() {
        return (
            <Formik
                initialValues={this.state}
                validationSchema={this.inputSchema}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-user-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.title-edit-user' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-user-body d-flex'>
                                <div className='content-right ml-3' style={{ "width": "30%" }} >
                                    <div className='preview-img-container input-container'>
                                        <div className='preview-image'
                                            style={{ "backgroundImage": `url(${this.state.previewImgURL})`, "height": "100%" }}
                                        >
                                        </div>
                                        <input
                                            disabled={!this.state.isAllowEdit} id='previewImg' type='file' hidden
                                            onChange={(event) => { this.handleOnchangeImage(event) }}
                                        />
                                        <label className='label-upload text-center' htmlFor='previewImg'><FormattedMessage id='modal.upload' /><i className='fas fa-upload'></i></label>
                                    </div>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.birthday' /></label>
                                        <DatePicker
                                            disabled={!this.state.isAllowEdit}
                                            onChange={(e) => this.handleOnchangeDatePicker(e, 'birthDay')}
                                            value={this.state.birthDay}
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.start-work' /></label>
                                        <DatePicker
                                            disabled={!this.state.isAllowEdit}
                                            onChange={(e) => this.handleOnchangeDatePicker(e, 'startWork')}
                                            value={this.state.startWork}
                                        />
                                    </div>
                                </div>
                                <div className='content-left' style={{ "width": "60%" }}>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.name' /></label>
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
                                            <label><FormattedMessage id='modal.gender' /></label>
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
                                            <label><FormattedMessage id='modal.role' /></label>
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
                                            <label><FormattedMessage id='modal.phone-number' /></label>
                                            <input
                                                disabled={!this.state.isAllowEdit}
                                                type='text'
                                                value={this.state.phonenumber}
                                                name='phonenumber'
                                                onBlur={handleBlur}
                                                onChange={(e) => this.handleChange(e, values)}
                                            />
                                            {errors.phonenumber &&
                                                touched.phonenumber &&
                                                <p
                                                    style={{
                                                        'position': 'absolute',
                                                        'margin-top': '60px',
                                                        'margin-left': '2px',
                                                        'color': 'red',
                                                        'font-style': 'italic',
                                                    }}
                                                >{errors.phonenumber}</p>
                                            }
                                        </div>
                                        <div className='input-container' style={{ "width": "48%" }}>
                                            <label><FormattedMessage id='modal.email' /></label>
                                            <input
                                                disabled={!this.state.isAllowEdit}
                                                type='text'
                                                value={this.state.email}
                                                name='email'
                                                onBlur={handleBlur}
                                                onChange={(e) => this.handleChange(e, values)}
                                            />
                                            {
                                                errors.email &&
                                                touched.email &&
                                                <p
                                                    style={{
                                                        'position': 'absolute',
                                                        'margin-top': '60px',
                                                        'margin-left': '2px',
                                                        'color': 'red',
                                                        'font-style': 'italic',
                                                    }}
                                                >{errors.email}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='input-container mr-4' style={{ "width": "48%" }}>
                                            <label><FormattedMessage id='modal.username' /></label>
                                            <input
                                                disabled={!this.state.isAllowEdit}
                                                type='text'
                                                value={this.state.username}
                                                name='username'
                                                onBlur={handleBlur}
                                                onChange={(e) => this.handleChange(e, values)}
                                            />
                                            {
                                                errors.username &&
                                                touched.username &&
                                                <p
                                                    style={{
                                                        'position': 'absolute',
                                                        'margin-top': '60px',
                                                        'margin-left': '2px',
                                                        'color': 'red',
                                                        'font-style': 'italic',
                                                    }}
                                                >{errors.username}
                                                </p>
                                            }
                                        </div>
                                        <div className='input-container' style={{ "width": "48%" }}>
                                            <label><FormattedMessage id='modal.password' /></label>
                                            <input
                                                disabled={true}
                                                type='password'
                                                value={this.state.password}
                                                name='password'
                                                onBlur={handleBlur}
                                                onChange={(e) => this.handleChange(e, values)}
                                            />
                                            {
                                                errors.password &&
                                                touched.password &&
                                                <p
                                                    style={{
                                                        'position': 'absolute',
                                                        'margin-top': '60px',
                                                        'margin-left': '2px',
                                                        'color': 'red',
                                                        'font-style': 'italic',
                                                    }}
                                                >{errors.password}
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.address' /></label>
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
                            ><FormattedMessage id='modal.edit' /></Button>
                            {
                                this.state.isAllowEdit
                                &&
                                <Button
                                    style={{ "height": "40px", "width": "150px" }}
                                    className='px-5 border-0 bg-danger' onClick={() => { this.handleCancelEdit() }}
                                ><FormattedMessage id='modal.cancel' /></Button>
                            }
                            {
                                this.state.isAllowEdit &&
                                <Button
                                    style={{ "height": "40px", "width": "170px" }}
                                    className='px-5 border-0 bg-primary'
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id='modal.save' /></Button>
                            }
                        </ModalFooter>
                    </Modal >
                )
                }
            </Formik>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.users.listUsers,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editAUser: (data) => dispatch(actions.editAUser(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
