import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDiscount.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
import DatePicker from 'react-flatpickr';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { unchangedTextChangeRange } from 'typescript';
import { Fragment } from 'react';
import { values } from 'lodash';
import { data } from 'jquery';
class ModalDiscount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage: "",
            name: "",
            state: "Active",
            start: undefined,
            end: undefined,
            customerRank: "Bronze"
        }
        this.formikRef = React.createRef();
    }
    handleAddNewDiscount = (values, resetForm) => {
        this.props.createNewDiscount(
            {
                name: values.name,
                state: values.state,
                start: values.start,
                end: values.end,
                percentage: values.percentage,
                customerRank: values.customerRank
            }
        )
        this.toggle();
        resetForm();
    }
    toggle = () => {
        this.props.toggleFromParent();
        this.formikRef.current.resetForm();
    }
    // Define input validation
    inputSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        state: Yup.string().required("Required!"),
        customerRank: Yup.string().required("Required!"),
        percentage: Yup.number().required("Required!"),
        start: Yup.string().required("Required!"),
        end: Yup.string().required("Required!"),
    })
    render() {
        return (
            <Formik
                initialValues={this.state}
                validationSchema={this.inputSchema}
                onSubmit={(values, { resetForm }) => this.handleAddNewDiscount(values, resetForm)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-discount-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='discount.add-new-discount' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-discount-body'>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='modal.name' /></label>
                                    <input
                                        className='w-100'
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
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='discount.state' /></label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={values.state}
                                            onBlur={handleBlur}
                                            name='state'
                                            onChange={handleChange}
                                        >
                                            <option value={'Active'}>{this.props.language === "en" ? "Active" : "Còn hiệu lực"}</option>
                                            <option value={"End"}>{this.props.language === "en" ? "End" : "Hết hiệu lực"}</option>
                                        </select>
                                        {errors.state &&
                                            touched.state &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '-2px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.state}</p>
                                        }
                                    </div>
                                </div>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='discount.start' /></label>
                                    <DatePicker
                                        value={values.start}
                                        name='start'
                                        onBlur={handleBlur}
                                        onChange={(date) => {
                                            values.start = date[0]
                                        }}
                                    />
                                    {errors.start &&
                                        touched.start &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.start}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='discount.end' /></label>
                                    <DatePicker
                                        value={values.end}
                                        name='end'
                                        onBlur={handleBlur}
                                        onChange={(date) => {
                                            values.end = date[0]
                                        }}
                                    />
                                    {errors.end &&
                                        touched.end &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.end}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='discount.percentage' /></label>
                                    <input
                                        type='text'
                                        value={values.percentage}
                                        name='percentage'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.percentage &&
                                        touched.percentage &&
                                        <p
                                            style={{
                                                'position': 'absolute',
                                                'margin-top': '60px',
                                                'margin-left': '2px',
                                                'color': 'red',
                                                'font-style': 'italic',
                                            }}
                                        >{errors.percentage}</p>
                                    }
                                </div>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label><FormattedMessage id='discount.customer-rank' /></label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            name='customerRank'
                                            value={values.customerRank}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            <option value={"Gold"}>{this.props.language === "en" ? "Gold" : "Vàng"}</option>
                                            <option value={'Silver'}>{this.props.language === "en" ? "Silver" : "Bạc"}</option>
                                            <option value={"Bronze"}>{this.props.language === "en" ? "Bronze" : "Đồng"}</option>
                                        </select>
                                        {errors.customerRank &&
                                            touched.customerRank &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '-2px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.customerRank}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className='mt-3'>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}><FormattedMessage id='modal.cancel' /></Button>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className='px-5 border-0 bg-primary'
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
        createNewDiscount: (data) => dispatch(actions.createNewDiscount(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDiscount);
