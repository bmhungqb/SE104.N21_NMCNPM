import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditSupplier.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalEditSupplier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            name: "",
            phoneNumber: "",
            address: "",
            email: "",
            errMessage: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        const { listSuppliers, supplierEditId } = this.props;
        const supplierInfor = listSuppliers.find(row => row.id === supplierEditId);

        if (supplierInfor && !_.isEmpty(supplierInfor)) {
            const { id, name, phoneNumber, address, email } = supplierInfor;
            this.setState({ id, name, phoneNumber, address, email });
        }
    }

    handleCancelEdit = () => {
        const { listSuppliers, supplierEditId } = this.props;
        const supplierInfor = listSuppliers.find(row => row.id === supplierEditId);

        if (supplierInfor && !_.isEmpty(supplierInfor)) {
            this.setState({ ...supplierInfor });
        }
        this.toggleEdit();
    }
    handleSaveSupplier = (values) => {
        this.props.editASupplier({
            id: this.state.id,
            name: values.name,
            phoneNumber: values.phoneNumber,
            address: values.address,
            email: values.email,
        })
        this.toggleEdit();
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleEdit = () => {
        this.setState(prevState => ({
            isAllowEdit: !prevState.isAllowEdit
        }));
    }
    inputSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        address: Yup.string().required("Required!"),
        email: Yup.string().email("Invalid email").required("Required!"),
        phoneNumber: Yup.string()
            .trim()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Required!")
    });
    handleChange = (e, values) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        values[e.target.name] = e.target.value
    }
    render() {
        return (
            <Formik
                initialValues={
                    {
                        name: '',
                        phoneNumber: '',
                        address: '',
                        email: '',
                    }
                }
                validationSchema={this.inputSchema}
                onSubmit={(values) => this.handleSaveSupplier(values)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-supplier-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.title-edit-supplier' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-supplier-body'>
                                <div
                                    className='input-container'
                                    style={{ "width": "100%" }}
                                >
                                    <label><FormattedMessage id='modal.supplierId' /></label>
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
                                    <label><FormattedMessage id='modal.name' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={this.state.name}
                                        onBlur={handleBlur}
                                        name='name'
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {this.state.isAllowEdit && errors.name &&
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
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        style={{ "width": "90%" }}
                                        value={this.state.phoneNumber}
                                        name='phoneNumber'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {this.state.isAllowEdit && errors.phoneNumber &&
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
                                        style={{ "width": "90%" }}
                                        type='text'
                                        value={this.state.address}
                                        name='address'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {this.state.isAllowEdit && errors.address &&
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
                                        disabled={!this.state.isAllowEdit}
                                        style={{ "width": "90%" }}
                                        type='text'
                                        value={this.state.email}
                                        name='email'
                                        onBlur={handleBlur}
                                        onChange={(e) => this.handleChange(e, values)}
                                    />
                                    {this.state.isAllowEdit && errors.email &&
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
                                    type='submit'
                                    onClick={handleSubmit}
                                ><FormattedMessage id='modal.save' /></Button>
                            }
                        </ModalFooter>
                    </Modal >
                )
                }
            </Formik >
        )
    }

}

const mapStateToProps = state => {
    return {
        listSuppliers: state.supplier.listSuppliers,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editASupplier: (data) => dispatch(actions.editASupplier(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSupplier);
