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
class ModalSupplier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneNumber: "",
            address: "",
            email: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: "",
                phoneNumber: "",
                address: "",
                email: "",
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
            'name',
            'phoneNumber',
            'address',
            'email',
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
    handleAddNewSupplier = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewSupplier(this.state)
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
            this.toggle()
        }
    }
    componentDidMount() {
    }

    toggle = () => {
        // emitter.emit('EVENT_CLEAR_MODAL_DATA')
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-supplier-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new supplier</ModalHeader>
                <ModalBody>
                    <div className='modal-supplier-body'>
                        <div
                            className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Name</label>
                            <input
                                type='text'
                                style={{ "width": "90%" }}
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, 'name')}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Phone Number</label>
                            <input
                                type='text'
                                style={{ "width": "90%" }}
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Address</label>
                            <input
                                style={{ "width": "90%" }}
                                type='text'
                                value={this.state.address}
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "48%" }}
                        >
                            <label>Email</label>
                            <input
                                style={{ "width": "90%" }}
                                type='text'
                                value={this.state.email}
                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "100%" }}
                        >
                            <label>Supply History</label>
                            <div className='select-genre'>
                                <textarea
                                    style={{ "width": "100%" }} />
                            </div>
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
                        onClick={() => this.handleAddNewSupplier()}
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
        createNewSupplier: (data) => dispatch(actions.createNewSupplier(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSupplier);
