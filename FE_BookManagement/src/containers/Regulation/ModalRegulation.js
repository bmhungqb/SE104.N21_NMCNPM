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
class ModalRegulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            typeConstraint: "",
            constraint: "",
            errMessage: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                description: "",
                typeConstraint: "",
                constraint: "",
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
            'description',
            'typeConstraint',
            'constraint',
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
    handleAddNewConstraint = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewRegulation(
                {
                    description: this.state.description,
                    typeConstraint: this.state.typeConstraint,
                    constraint: this.state.constraint,
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
                className={'modal-regulation-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new regulation</ModalHeader>
                <ModalBody>
                    <div className='modal-regulation-body'>
                        <div className='input-container'
                            style={{ "width": "97%" }}
                        >
                            <label>Description</label>
                            <input
                                type='text'
                                value={this.state.description}
                                onChange={(e) => this.handleOnchangeInput(e, 'description')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Type Of Constraint</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.typeConstraint}
                                    onChange={(e) => this.handleOnchangeInput(e, 'typeConstraint')}
                                >
                                    <option value={'Active'}>Active</option>
                                    <option value={"End"}>End</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container'
                            style={{ "width": "42%" }}
                        >
                            <label>Constraint</label>
                            <input
                                type='text'
                                value={this.state.constraint}
                                onChange={(e) => this.handleOnchangeInput(e, 'constraint')}
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
                        onClick={() => this.handleAddNewConstraint()}
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
        createNewRegulation: (data) => dispatch(actions.createNewRegulation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegulation);
