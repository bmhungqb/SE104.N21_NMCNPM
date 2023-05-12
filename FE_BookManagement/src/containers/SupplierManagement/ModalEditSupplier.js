import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditSupplier.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index'
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
        let supplierInfor;
        this.props.listSuppliers.forEach(row => {
            if (row.id === this.props.supplierEditId) {
                supplierInfor = row
                return
            }
        });
        if (supplierInfor && !_.isEmpty(supplierInfor)) {
            this.setState({
                id: supplierInfor.id,
                name: supplierInfor.name,
                phoneNumber: supplierInfor.phoneNumber,
                address: supplierInfor.address,
                email: supplierInfor.email,
            })
        }
    }
    handleCancelEdit = () => {
        let supplierInfor;
        this.props.listSuppliers.forEach(row => {
            if (row.id === this.props.supplierEditId) {
                supplierInfor = row
                return
            }
        });
        if (supplierInfor && !_.isEmpty(supplierInfor)) {
            this.setState({
                ...this.props.listSuppliers
            })
        }
        this.toggleEdit()
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
    handleSaveSupplier = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.toggleEdit();
            this.props.editASupplier(this.state)
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleEdit = () => {
        this.setState({
            isAllowEdit: !this.state.isAllowEdit
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-supplier-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit supplier information</ModalHeader>
                <ModalBody>
                    <div className='modal-supplier-body'>
                        <div
                            className='input-container'
                            style={{ "width": "100%" }}
                        >
                            <label>Supplier ID</label>
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
                            <label>Name</label>
                            <input
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                                disabled={!this.state.isAllowEdit}
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
                            onClick={() => this.handleSaveSupplier()}
                        >Save</Button>
                    }
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        listSuppliers: state.supplier.listSuppliers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editASupplier: (data) => dispatch(actions.editASupplier(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSupplier);
