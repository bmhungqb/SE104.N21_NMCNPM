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
class ModalDiscount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "",
            code: "",
            name: "",
            start: "",
            end: "",
            percentage: "",
            quantity: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                state: "",
                code: "",
                name: "",
                start: "",
                end: "",
                percentage: "",
                quantity: "",
            })
        })
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
    handleAddNewDiscount = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewDiscount(
                {
                    name: this.state.name,
                    code: this.state.code,
                    state: this.state.state,
                    start: this.state.start,
                    end: this.state.end,
                    percentage: this.state.percentage,
                    quantity: this.state.quantity,
                }
            )
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.toggle()
        }
    }
    componentDidMount() {

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
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-discount-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new discount</ModalHeader>
                <ModalBody>
                    <div className='modal-discount-body'>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Voucher Code</label>
                            <input
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
                                onChange={(date) => this.handleOnchangeDatePicker(date, 'start')}
                                value={this.state.start}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>End</label>
                            <DatePicker
                                onChange={(date) => this.handleOnchangeDatePicker(date, 'end')}
                                value={this.state.end}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Percentage</label>
                            <input
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
                        className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewDiscount()}
                    >Add</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewDiscount: (data) => dispatch(actions.createNewDiscount(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDiscount);
