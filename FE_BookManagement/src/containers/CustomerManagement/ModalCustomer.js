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
            firstName: "",
            lastName: "",
            customerState: "",
            gender: "",
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
                fullname: this.state.firstName + " " + this.state.lastName,
                rank: this.state.customerState,
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
        phoneNumber: Yup.string()
            .transform((value, originalValue) => {
                // Remove all non-digit characters from the input
                if (originalValue) {
                    return originalValue.replace(/\D/g, "");
                }
                return value;
            })
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required("Required!"),
        firstName: Yup.string().required("Required!"),
        lastName: Yup.string().required("Required!"),
        customerState: Yup.string().required("Required!"),
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
                                        value={this.state.firstName}
                                        name='firstName'
                                        onBlur={handleBlur}
                                        onChange={(date) => this.handleChange(date, values)}
                                    />
                                    {errors.firstName &&
                                        touched.firstName &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.firstName}</p>
                                    }
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        value={this.state.lastName}
                                        name='lastName'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        errors.lastName &&
                                        touched.lastName &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.lastName}
                                        </p>
                                    }
                                </div>

                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Gender</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.gender}
                                            name='gender'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Male"}>Male</option>
                                            <option value={'Female'}>Female</option>
                                            <option value={"Other"}>Other</option>
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
                                    <label>Phone Number</label>
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
                                    <label>Address</label>
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
                                    <label>Email</label>
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
                                    <label>Customer State</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.customerState}
                                            name='customerState'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Normal"}>Normal</option>
                                            <option value={'Vip'}>Vip</option>
                                            <option value={"Gold"}>Gold</option>
                                        </select>
                                    </div>
                                    {errors.customerState &&
                                        touched.customerState &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.customerState}</p>
                                    }
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
                                type='submit'
                                onClick={handleSubmit}
                            >Add</Button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewCustomer: (data) => dispatch(actions.createNewCutomer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCustomer);
