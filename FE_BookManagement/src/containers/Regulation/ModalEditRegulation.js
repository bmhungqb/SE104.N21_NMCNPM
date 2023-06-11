import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditRegulation.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
import DatePicker from 'react-flatpickr';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalEditRegulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regulationId: undefined,
            name: '',
            minimumInput: '',
            minimumStock: '',
            maximumDept: '',
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        let regulationInfor;
        this.props.listRegulations.forEach(row => {
            if (row.regulationId === this.props.regulationEdit) {
                regulationInfor = row
                return
            }
        });
        if (regulationInfor && !_.isEmpty(regulationInfor)) {
            this.setState({
                regulationId: regulationInfor.regulationId,
                name: regulationInfor.name,
                minimumInput: regulationInfor.minimumInput,
                minimumStock: regulationInfor.minimumStock,
                maximumDept: regulationInfor.maximumDept,
            })
        }
    }
    handleSaveRegulation = (values) => {
        this.props.editARegulation({
            regulationId: this.state.regulationId,
            name: this.state.name,
            minimumInput: this.state.minimumInput,
            minimumStock: this.state.minimumStock,
            maximumDept: this.state.maximumDept,
        })
        this.toggle()
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleEdit = () => {
        this.setState({
            isAllowEdit: !this.state.isAllowEdit
        })
    }
    handleCancelEdit = () => {
        let regulationInfor;
        this.props.listRegulations.forEach(row => {
            if (row.regulationId === this.props.regulationEdit) {
                regulationInfor = row
                return
            }
        });
        if (regulationInfor && !_.isEmpty(regulationInfor)) {
            this.setState({
                ...this.props.listRegulations,
            })
        }
        this.toggleEdit()
    }
    inputSchema = Yup.object().shape({
        name: Yup.string(),
        minimumInput: Yup.number(),
        minimumStock: Yup.number(),
        maximumDept: Yup.number(),
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
                    name: '',
                    minimumInput: '',
                    minimumStock: '',
                    maximumDept: '',
                }}
                validationSchema={this.inputSchema}
                onSubmit={(values, { resetForm }) => this.handleSaveRegulation(values, resetForm)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-regulation-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id='modal.title-edit-regulation' /></ModalHeader>
                        <ModalBody>
                            <div className='modal-regulation-body'>
                                <div className='input-container'
                                    style={{ "width": "100%" }}
                                >
                                    <label><FormattedMessage id='modal.name' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.name}
                                        onBlur={handleBlur}
                                        name='name'
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.name &&
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
                                    <label><FormattedMessage id='regulation.min-input' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.minimumInput}
                                        onBlur={handleBlur}
                                        name='minimumInput'
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                    {
                                        this.state.isAllowEdit &&
                                        errors.minimumInput &&
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
                                    <label><FormattedMessage id='regulation.min-stock' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.minimumStock}
                                        onBlur={handleBlur}
                                        name='minimumStock'
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.minimumStock &&
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
                                    <label><FormattedMessage id='regulation.max-debt' /></label>
                                    <input
                                        disabled={!this.state.isAllowEdit}
                                        type='text'
                                        value={this.state.maximumDept}
                                        onBlur={handleBlur}
                                        name='maximumDept'
                                        onChange={(e) => { this.handleChange(e, values) }}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.maximumDept &&
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
            </Formik>
        )
    }

}

const mapStateToProps = state => {
    return {
        listRegulations: state.regulation.listRegulations,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editARegulation: (data) => dispatch(actions.editARegulation(data)),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditRegulation);
