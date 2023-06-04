import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalRegulation.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
import DatePicker from 'react-flatpickr';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalRegulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage: ""
        }
        this.formikRef = React.createRef();
    }
    handleAddNewRegulation = (values, resetForm) => {
        this.props.createNewRegulation(
            {
                name: values.name,
                minimumInput: values.minimumInput,
                minimumStock: values.minimumStock,
                maximumDept: values.maximumDept,
            })
        this.toggle();
        resetForm();
    }
    toggle = () => {
        this.props.toggleFromParent();
        this.formikRef.current.resetForm();
    }
    inputSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        minimumInput: Yup.number().required("Required!"),
        minimumStock: Yup.number().required("Required!"),
        maximumDept: Yup.number().required("Required!"),
    })
    render() {
        return (
            <Formik
                initialValues={{
                    name: '',
                    minimumInput: '',
                    minimumStock: '',
                    maximumDept: '',
                }}
                validationSchema={this.inputSchema}
                onSubmit={(values, { resetForm }) => this.handleAddNewRegulation(values, resetForm)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-regulation-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}>Add new regulation</ModalHeader>
                        <ModalBody>
                            <div className='modal-regulation-body'>
                                <div className='input-container'
                                    style={{ "width": "100%" }}
                                >
                                    <label>Name</label>
                                    <input
                                        type='text'
                                        value={values.name}
                                        onBlur={handleBlur}
                                        name='name'
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
                                <div className='input-container'
                                    style={{ "width": "42%" }}
                                >
                                    <label>Minimum Input</label>
                                    <input
                                        type='text'
                                        value={values.minimumInput}
                                        onBlur={handleBlur}
                                        name='minimumInput'
                                        onChange={handleChange}
                                    />
                                    {errors.minimumInput &&
                                        touched.minimumInput &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.minimumInput}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "42%" }}
                                >
                                    <label>Minimum Stock</label>
                                    <input
                                        type='text'
                                        value={values.minimumStock}
                                        onBlur={handleBlur}
                                        name='minimumStock'
                                        onChange={handleChange}
                                    />
                                    {errors.minimumStock &&
                                        touched.minimumStock &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.minimumStock}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "42%" }}
                                >
                                    <label>Maximum Dept</label>
                                    <input
                                        type='text'
                                        value={values.maximumDept}
                                        onBlur={handleBlur}
                                        name='maximumDept'
                                        onChange={handleChange}
                                    />
                                    {errors.maximumDept &&
                                        touched.maximumDept &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.maximumDept}</p>
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
        createNewRegulation: (data) => dispatch(actions.createNewRegulation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegulation);
