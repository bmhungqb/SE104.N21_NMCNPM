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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: "",
            gender: "Male",
            role: "Employee",
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
        this.formikRef = React.createRef();
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleAddNewUser = () => {
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
        this.toggle()
        resetForm();
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
    handleChange = (e, values) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        values[e.target.name] = e.target.value
    }
    inputSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        gender: Yup.string(),
        role: Yup.string().required("Required!"),
        phonenumber: Yup.number()
            .typeError("Must be a number type")
            .required('Required!'),
        email: Yup.string().email().required("Required!"),
        birthDay: Yup.string(),
        username: Yup.string().required("Required!"),
        password: Yup.string().required("Required!"),
        startWork: Yup.string(),
        address: Yup.string(),
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
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.add-user' /></ModalHeader>
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
                                        <label className='label-upload text-center' htmlFor='previewImg'><FormattedMessage id='modal.upload' /><i className='fas fa-upload ml-2'></i></label>
                                    </div>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.birthday' /></label>
                                        <DatePicker
                                            onChange={(e) => this.handleOnchangeDatePicker(e, 'birthDay')}
                                            value={this.state.birthDay}
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.start-work' /></label>
                                        <DatePicker
                                            onChange={(e) => this.handleOnchangeDatePicker(e, 'startWork')}
                                            value={this.state.startWork}
                                        />
                                    </div>
                                </div>
                                <div className='content-left' style={{ "width": "60%" }}>
                                    <div className='input-container'>
                                        <label><FormattedMessage id='modal.name' /></label>
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
                                            <label><FormattedMessage id='modal.gender' /></label>
                                            <div className='select-genre'>
                                                <select
                                                    className='form-select'
                                                    value={this.state.gender}
                                                    onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                                >
                                                    <option value={'Male'}>{this.props.language === "en" ? "Male" : "Nam"}</option>
                                                    <option value={"Female"}>{this.props.language === "en" ? "Female" : "Nữ"}</option>
                                                    <option value={"Other"}>{this.props.language === "en" ? "Other" : "Khác"}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='input-container' style={{ "width": "48%" }}>
                                            <label><FormattedMessage id='modal.role' /></label>
                                            <div className='select-genre'>
                                                <select
                                                    className='form-select'
                                                    value={this.state.role}
                                                    onChange={(e) => this.handleOnchangeInput(e, 'role')}
                                                >
                                                    <option value={'Manager'}>{this.props.language === "en" ? "Manager" : "Quản lý"}</option>
                                                    <option value={"Employee"}>{this.props.language === "en" ? "Employee" : "Nhân viên"}</option>
                                                    <option value={"Supporter"}>{this.props.language === "en" ? "Supporter" : "Hỗ trợ viên"}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='input-container mr-4' style={{ "width": "48%" }}>
                                            <label><FormattedMessage id='modal.phone-number' /></label>
                                            <input
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
                                                type='text'
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
                                className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}><FormattedMessage id='modal.cancel' /></Button>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-primary'
                                onClick={() => this.handleAddNewUser()}
                            ><FormattedMessage id='modal.add' /></Button>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
