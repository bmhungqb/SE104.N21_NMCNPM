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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            rank: "Gold",
            gender: "Male",
            phoneNumber: "",
            address: "",
            email: "",
            errMessage: ""
        }
        this.formikRef = React.createRef();
    }
    handleAddNewCustomer = () => {
        this.props.createNewCustomer(
            {
                fullName: this.state.fullName,
                rank: this.state.rank,
                sex: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                email: this.state.email,
            }
        )
        this.toggle();
        resetForm();
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
        this.formikRef.current.resetForm();
    }
    inputSchema = Yup.object().shape({
        phoneNumber: Yup.number()
            .typeError("Must be a number type")
            .required('Required!'),
        fullName: Yup.string().required("Required!"),
        rank: Yup.string().required("Required!"),
        gender: Yup.string().required("Required!"),
        address: Yup.string().required("Required!"),
        email: Yup.string().email().required("Required!"),
    })
    handleChange = (e, values) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        values[e.target.name] = e.target.value
    }
    render() {
        return (
            <Formik
                initialValues={this.state}
                validationSchema={this.inputSchema}
                onSubmit={(values, { resetForm }) => this.handleAddNewCustomer(values, resetForm)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-customer-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='customer-management.add-customer' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-customer-body'>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.fullName' /></label>
                                    <input
                                        type='text'
                                        value={this.state.fullName}
                                        name='fullName'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        errors.fullName &&
                                        touched.fullName &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.fullName}
                                        </p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.gender' /></label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.gender}
                                            name='gender'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Male"}>{this.props.language === "en" ? "Male" : "Nam"}</option>
                                            <option value={'Female'}>{this.props.language === "en" ? "Female" : "Nữ"}</option>
                                            <option value={"Other"}>{this.props.language === "en" ? "Other" : "Khác"}</option>
                                        </select>
                                    </div>
                                    {errors.gender &&
                                        touched.gender &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.gender}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.phone-number' /></label>
                                    <input
                                        type='text'
                                        value={this.state.phoneNumber}
                                        name='phoneNumber'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {errors.phoneNumber &&
                                        touched.phoneNumber &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.phoneNumber}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.address' /></label>
                                    <input
                                        type='text'
                                        value={this.state.address}
                                        name='address'
                                        onChange={(e) => this.handleChange(e, values)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.address &&
                                        touched.address &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.address}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.email' /></label>
                                    <input
                                        type='text'
                                        value={this.state.email}
                                        name='email'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {errors.email &&
                                        touched.email &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.email}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.customer-state' /></label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.rank}
                                            name='rank'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Gold"}>{this.props.language === "en" ? "Gold" : "Vàng"}</option>
                                            <option value={'Silver'}>{this.props.language === "en" ? "Silver" : "Bạc"}</option>
                                            <option value={"Bronze"}>{this.props.language === "en" ? "Bronze" : "Đồng"}</option>
                                        </select>
                                    </div>
                                    {errors.rank &&
                                        touched.rank &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.rank}</p>
                                    }
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>
                                <FormattedMessage id='modal.cancel' />
                            </Button>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-primary'
                                type='submit'
                                onClick={handleSubmit}
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
        createNewCustomer: (data) => dispatch(actions.createNewCutomer(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCustomer);
