import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalSupplier.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import * as actions from '../../store/actions/index'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { unchangedTextChangeRange } from 'typescript';
import { Fragment } from 'react';
import { values } from 'lodash';
import { data } from 'jquery';
class ModalSupplier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errMessage: ""
        }
    }
    handleAddNewSupplier = (values, resetForm) => {
        this.props.createNewSupplier({
            name: values.name,
            phoneNumber: values.phoneNumber,
            address: values.address,
            email: values.email,
        })
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
        name: Yup.string().required("Required!"),
        address: Yup.string().required("Required!"),
        email: Yup.string().email().required("Required!"),
        phoneNumber: Yup.number()
            .typeError("Must be a number type")
            .required('Required!'),
    });
    render() {
        return (
            <Formik
                initialValues={{
                    name: '',
                    phoneNumber: '',
                    address: '',
                    email: '',
                }}
                validationSchema={this.inputSchema}
                onSubmit={(values, { resetForm }) => this.handleAddNewSupplier(values, resetForm)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-supplier-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='supplier-management.add-new-supplier' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-supplier-body'>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.name' /></label>
                                    <input
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={values.name}
                                        name='name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {errors.name &&
                                        touched.name &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.name}</p>
                                    }
                                </div>
                                <div
                                    className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.phone-number' /></label>
                                    <input
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={values.phoneNumber}
                                        name='phoneNumber'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        >{errors.phoneNumber}</p>}
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.address' /></label>
                                    <input
                                        style={{ "width": "90%" }}
                                        type='text'
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name='address'
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
                                        >{errors.address}</p>}
                                </div>
                                <div className='input-container'
                                    style={{ "width": "48%" }}
                                >
                                    <label><FormattedMessage id='modal.email' /></label>
                                    <input
                                        style={{ "width": "90%" }}
                                        type='text'
                                        value={values.email}
                                        onChange={handleChange}
                                        name='email'
                                        onBlur={handleBlur}
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
                                        >{errors.email}</p>}
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
                            >
                                <FormattedMessage id='modal.add' />
                            </Button>
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
        createNewSupplier: (data) => dispatch(actions.createNewSupplier(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSupplier);
