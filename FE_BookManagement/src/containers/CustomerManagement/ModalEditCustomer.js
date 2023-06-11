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
            rank: "",
            sex: "",
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
            this.setState({
                customerId: customerInfor.customerId,
                fullName: customerInfor.fullName,
                rank: customerInfor.rank,
                sex: customerInfor.sex,
                phoneNumber: customerInfor.phoneNumber,
                address: customerInfor.address,
                email: customerInfor.email,
            });
        }
    }
    handleCancelEdit = () => {
        const customerInfor = this.props.listCustomers.find(row => row.customerId === this.props.customerEditId);
        if (customerInfor) {
            this.setState({
                fullName: customerInfor.fullName,
                rank: customerInfor.rank,
                sex: customerInfor.sex,
                phoneNumber: customerInfor.phoneNumber,
                address: customerInfor.address,
                email: customerInfor.email,
            });
        }
        this.toggleEdit();
    }
    handleSaveCustomer = () => {
        this.props.editACustomer({
            customerId: this.state.customerId,
            fullName: this.state.fullName,
            rank: this.state.rank,
            sex: this.state.sex,
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
        phoneNumber: Yup.number()
            .typeError("Must be a number type"),
        fullName: Yup.string(),
        rank: Yup.string(),
        sex: Yup.string(),
        address: Yup.string(),
        email: Yup.string().email('The email has an invalid format.'),
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
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.title-edit-customer' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-customer-body'>
                                <div
                                    className='input-container'
                                    style={{ "width": "100%" }}
                                >
                                    <label><FormattedMessage id='modal.customerId' /></label>
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
                                    <label><FormattedMessage id='modal.fullName' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        name='fullName'
                                        value={this.state.fullName}
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                </div>

                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.gender' /></label>
                                    <div className='select-genre'>
                                        <select
                                            disabled={!this.state.isAllowEdit}
                                            className='form-select'
                                            value={this.state.sex}
                                            name='sex'
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Male"}>{this.props.language === "en" ? "Male" : "Nam"}</option>
                                            <option value={'Female'}>{this.props.language === "en" ? "Female" : "Nữ"}</option>
                                            <option value={"Other"}>{this.props.language === "en" ? "Other" : "Khác"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.phone-number' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.phoneNumber}
                                        name='phoneNumber'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        this.state.isAllowEdit &&
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
                                    <label><FormattedMessage id='modal.address' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.address}
                                        name='address'
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.email' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.email}
                                        onBlur={handleBlur}
                                        name='email'
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {
                                        this.state.isAllowEdit &&
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
                                    <label><FormattedMessage id='modal.customer-state' /></label>
                                    <div className='select-genre'>
                                        <select
                                            disabled={!this.state.isAllowEdit}
                                            className='form-select'
                                            value={this.state.rank}
                                            name='rank'
                                            onChange={(e) => this.handleChange(e, values)}
                                        >
                                            <option value={"Gold"}>{this.props.language === "en" ? "Gold" : "Vàng"}</option>
                                            <option value={'Silver'}>{this.props.language === "en" ? "Silver" : "Bạc"}</option>
                                            <option value={"Bronze"}>{this.props.language === "en" ? "Bronze" : "Đồng"}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className={this.state.isAllowEdit ? 'px-5 border-0 bg-success d-none' : 'px-5 border-0 bg-success'}
                                onClick={(values) => { this.toggleEdit(values) }}
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
                                    type='submit'
                                    onClick={() => this.handleSaveCustomer()}
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
        listCustomers: state.customer.listCustomers,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editACustomer: (data) => dispatch(actions.editACustomer(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCustomer);
