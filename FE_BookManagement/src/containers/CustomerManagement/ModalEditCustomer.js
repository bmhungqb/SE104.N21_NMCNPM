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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalEditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: undefined,
            fullName: "",
            firstName: "",
            lastName: "",
            rank: "",
            gender: "",
            phoneNumber: "",
            address: "",
            email: "",
            errMessage: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        const customerInfor = this.props.listCustomers.find(row => row.customerId === this.props.customerEditId);
        if (customerInfor) {
            const [lastName, firstName] = customerInfor.fullName.split(' ');
            this.setState({
                customerId: customerInfor.customerId,
                firstName,
                lastName,
                rank: customerInfor.rank,
                gender: customerInfor.gender,
                phoneNumber: customerInfor.phoneNumber,
                address: customerInfor.address,
                email: customerInfor.email,
            });
        }
    }
    handleCancelEdit = () => {
        const customerInfor = this.props.listCustomers.find(row => row.customerId === this.props.customerEditId);
        if (customerInfor) {
            const [lastName, firstName] = customerInfor.fullName.split(' ');
            this.setState({
                firstName,
                lastName,
                rank: customerInfor.rank,
                gender: customerInfor.gender,
                phoneNumber: customerInfor.phoneNumber,
                address: customerInfor.address,
                email: customerInfor.email,
            });
        }
        this.toggleEdit();
    }
    handleSaveCustomer = (values) => {
        this.props.editACustomer({
            customerId: this.state.customerId,
            fullName: `${this.state.lastName} ${this.state.firstName}`,
            rank: this.state.rank,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
        });
        this.toggle();
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleEdit = () => {
        this.setState(prevState => ({
            isAllowEdit: !prevState.isAllowEdit,
        }));
    };
    // Define input validation
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
                initialValues={{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    rank: this.state.rank,
                    gender: this.state.gender,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    email: this.state.email,
                }}
                validationSchema={this.inputSchema}
                onSubmit={(values) => { this.handleSaveCustomer(values) }}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                                        style={{ "width": "10%" }}
                                        value={this.state.customerId}
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
                                        name='firstName'
                                        value={this.state.firstName}
                                        onBlur={handleBlur}
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                    {
                                        errors.firstName &&
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        name='lastName'
                                        value={this.state.lastName}
                                        onBlur={handleBlur}
                                        onChange={(e) => { this.handleChange(e, values) }}
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
                                        >{errors.lastName}</p>
                                    }
                                </div>

                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Gender</label>
                                    <div className='select-genre'>
                                        <select
                                            disabled={!this.state.isAllowEdit}
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
                                        {
                                            errors.gender &&
                                            touched.gender &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '-3px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.gender}</p>
                                        }
                                    </div>
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Phone Number</label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.phoneNumber}
                                        name='phoneNumer'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        errors.phoneNumber &&
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.address}
                                        name='address'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        errors.address &&
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.email}
                                        onBlur={handleBlur}
                                        name='email'
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
                                        >{errors.email}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label>Customer State</label>
                                    <div className='select-genre'>
                                        <select
                                            disabled={!this.state.isAllowEdit}
                                            className='form-select'
                                            value={this.state.rank}
                                            name='rank'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Normal"}>Normal</option>
                                            <option value={'Vip'}>Vip</option>
                                            <option value={"Gold"}>Gold</option>
                                        </select>
                                        {
                                            errors.rank &&
                                            touched.rank &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '-3px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.rank}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className={this.state.isAllowEdit ? 'px-5 border-0 bg-success d-none' : 'px-5 border-0 bg-success'}
                                onClick={(values) => { this.toggleEdit(values) }}
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
                                    type='submit'
                                    onClick={handleSubmit}
                                >Save</Button>
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
        listCustomers: state.customer.listCustomers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editACustomer: (data) => dispatch(actions.editACustomer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCustomer);
