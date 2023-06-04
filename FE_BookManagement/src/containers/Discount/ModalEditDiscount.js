import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditDiscount.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
import DatePicker from 'react-flatpickr';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalEditDiscount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discountId: undefined,
            state: "",
            name: "",
            start: "",
            end: "",
            percentage: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        let discountInfor;
        this.props.listDiscounts.forEach(row => {
            if (row.discountId === this.props.discountEdit) {
                discountInfor = row
                return
            }
        });
        if (discountInfor && !_.isEmpty(discountInfor)) {
            this.setState({
                discountId: discountInfor.discountId,
                state: discountInfor.state,
                name: discountInfor.name,
                start: discountInfor.start,
                end: discountInfor.end,
                percentage: discountInfor.percentage,
            })
        }
    }
    handleSaveDiscount = () => {
        this.props.editADiscount({
            discountId: this.state.discountId,
            state: this.state.state,
            name: this.state.name,
            start: this.state.start,
            end: this.state.end,
            percentage: this.state.percentage,
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
        let discountInfor;
        this.props.listDiscounts.forEach(row => {
            if (row.id === this.props.discountEditId) {
                discountInfor = row
                return
            }
        });
        if (discountInfor && !_.isEmpty(discountInfor)) {
            this.setState({
                ...this.props.listDiscounts,
            })
        }
        this.toggleEdit()
    }
    inputSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        state: Yup.string().required("Required!"),
        customerRank: Yup.string().required("Required!"),
        percentage: Yup.number().required("Required!"),
        start: Yup.string().required("Required!"),
        end: Yup.string().required("Required!"),
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
                    name: "",
                    state: "",
                    start: "",
                    end: "",
                    percentage: "",
                    customerRank: "",
                }}
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
                        <ModalHeader toggle={() => { this.toggle() }}>Edit discount information</ModalHeader>
                        <ModalBody>
                            <div className='modal-discount-body'>
                                <div className='input-container'
                                    style={{ "width": "43%" }}
                                >
                                    <label>Name</label>
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
                                    style={{ "width": "43%" }}
                                >
                                    <label>State</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            value={this.state.state}
                                            onBlur={handleBlur}
                                            name='state'
                                            onChange={(e) => { this.handleChange(e, values) }}
                                        >
                                            <option value={'Active'}>Active</option>
                                            <option value={"End"}>End</option>
                                        </select>
                                        {this.state.isAllowEdit &&
                                            errors.state &&
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
                                    <label>Start</label>
                                    <DatePicker
                                        value={this.state.start}
                                        name='start'
                                        onBlur={handleBlur}
                                        onChange={(date) => {
                                            values.start = date[0];
                                            this.setState({
                                                start: date[0]
                                            })
                                        }}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.start &&
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
                                    <label>End</label>
                                    <DatePicker
                                        value={this.state.end}
                                        name='end'
                                        onBlur={handleBlur}
                                        onChange={(date) => {
                                            values.end = date[0];
                                            this.setState({
                                                end: date[0]
                                            })
                                        }}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.end &&
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
                                    <label>Percentage</label>
                                    <input
                                        type='text'
                                        value={this.state.percentage}
                                        name='percentage'
                                        onChange={(e) => { this.handleChange(e, values) }}
                                        onBlur={handleBlur}
                                    />
                                    {this.state.isAllowEdit &&
                                        errors.percentage &&
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
                                    <label>Customer Rank</label>
                                    <div className='select-genre'>
                                        <select
                                            className='form-select'
                                            name='customerRank'
                                            value={this.state.customerRank}
                                            onBlur={handleBlur}
                                            onChange={(e) => { this.handleChange(e, values) }}
                                        >
                                            <option value={'Normal'}>Normal</option>
                                            <option value={"Vip"}>Vip</option>
                                            <option value={"Gold"}>Gold</option>
                                        </select>
                                        {this.state.isAllowEdit &&
                                            errors.customerRank &&
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
                        <ModalFooter>
                            <Button
                                style={{ "height": "40px", "width": "150px" }}
                                className={this.state.isAllowEdit ? 'px-5 border-0 bg-success d-none' : 'px-5 border-0 bg-success'}
                                onClick={() => { this.toggleEdit() }}
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
                                    onClick={() => this.handleSaveDiscount()}
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
        listDiscounts: state.discount.listDiscounts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editADiscount: (data) => dispatch(actions.editADiscount(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDiscount);
