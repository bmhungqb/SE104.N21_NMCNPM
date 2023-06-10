import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalDebt.scss"
class ModalDebt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }
    componentDidMount() {

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
                <ModalHeader toggle={() => { this.toggle() }}>Inventoru</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div className='input-container'>
                            <label>Book ID</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Quantity</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container '>
                            <label>Book Title</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container '>
                            <label>Genre</label>
                            <select className='form-select'>
                                <option >Action and Adventure</option>
                                <option>Classics</option>
                                <option>Detective and Mystery</option>
                                <option>Fantasy</option>
                                <option>Historical Fiction</option>
                                <option>Horror</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Author</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Publisher</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container '>
                            <label>Selling Price</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Cost Price</label>
                            <input
                                type='text'
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Description</label>
                            <div class="form-outline">
                                <textarea class="form-control" id="textAreaExample2" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-5 border-0 bg-danger' >Clear</Button>
                    <Button className='px-5 border-0 bg-primary' onClick={() => { this.toggle() }}>Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDebt);
