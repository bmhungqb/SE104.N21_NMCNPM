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
class ModalEditDiscount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            code: "",
            state: "",
            name: "",
            start: "",
            end: "",
            percentage: "",
            quantity: "",
            isAllowEdit: false,
        }
    }
    componentDidMount() {
        let discountInfor;
        this.props.listDiscounts.forEach(row => {
            if (row.id === this.props.discountEdit) {
                discountInfor = row
                return
            }
        });
        if (discountInfor && !_.isEmpty(discountInfor)) {
            this.setState({
                id: discountInfor.id,
                code: discountInfor.code,
                state: discountInfor.state,
                name: discountInfor.name,
                start: discountInfor.start,
                end: discountInfor.end,
                percentage: discountInfor.percentage,
                quantity: discountInfor.quantity,
            })
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'state',
            'name',
            'code',
            'start',
            'end',
            'percentage',
            'quantity',
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter " + arrInput[i]);
                break;
            }
        }
        return isValid
    }
    handleSaveDiscount = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editADiscount(this.state)
            this.toggle()
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeDatePicker = (date, id) => {
        let copyState = { ...this.state }
        copyState[id] = date[0]
        this.setState({
            ...copyState
        })
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
    render() {
        return (
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
                            style={{ "width": "42%" }}
                        >
                            <label>Voucher Code</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                // style={{ "width": "42%" }}
                                type='text'
                                value={this.state.code}
                                onChange={(e) => this.handleOnchangeInput(e, 'code')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>State</label>
                            <div className='select-genre'>
                                <select
                                    disabled={!this.state.isAllowEdit}
                                    className='form-select'
                                    value={this.state.state}
                                    onChange={(e) => this.handleOnchangeInput(e, 'state')}
                                >
                                    <option value={'Active'}>Active</option>
                                    <option value={"End"}>End</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container'
                            style={{ "width": "97%" }}
                        >
                            <label>Name</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, 'name')}
                            />
                        </div>

                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Start</label>
                            <DatePicker
                                disabled={!this.state.isAllowEdit}
                                onChange={(date) => this.handleOnchangeDatePicker(date, 'start')}
                                value={this.state.start}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>End</label>
                            <DatePicker
                                disabled={!this.state.isAllowEdit}
                                onChange={(date) => this.handleOnchangeDatePicker(date, 'end')}
                                value={this.state.end}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Percentage</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.percentage}
                                onChange={(e) => this.handleOnchangeInput(e, 'percentage')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Quantity</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.quantity}
                                onChange={(e) => this.handleOnchangeInput(e, 'quantity')}
                            />
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
