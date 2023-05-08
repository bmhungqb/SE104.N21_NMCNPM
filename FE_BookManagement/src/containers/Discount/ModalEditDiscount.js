import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditDiscount.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalEditDiscount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            state: "",
            name: "",
            start: "",
            end: "",
            percentage: "",
            quantity: "",
        }
    }
    componentDidMount() {
        let discountInfor = this.props.discountEdit
        if (discountInfor && !_.isEmpty(discountInfor)) {
            this.setState({
                id: discountInfor.id,
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
            this.props.editDiscount(this.state)
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit discount information</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container '>
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
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, 'name')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Start</label>
                            <input
                                type='text'
                                value={this.state.start}
                                onChange={(e) => this.handleOnchangeInput(e, 'start')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>End</label>
                            <input
                                type='text'
                                value={this.state.end}
                                onChange={(e) => this.handleOnchangeInput(e, 'end')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Percentage</label>
                            <input
                                type='text'
                                value={this.state.percentage}
                                onChange={(e) => this.handleOnchangeInput(e, 'percentage')}
                            />
                        </div>
                        <div className='input-container'>
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
                    <Button className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleSaveDiscount()}
                    >Save</Button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDiscount);
