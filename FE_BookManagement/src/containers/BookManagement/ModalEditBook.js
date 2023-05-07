import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditBook.scss"
import { emitter } from '../../utils/emitter';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalEditBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            quantity: undefined,
            bookTitle: '',
            genre: '',
            author: '',
            publisher: '',
            sellingPrice: '',
            costPrice: '',
            errMessage: ""
        }
    }
    componentDidMount() {
        let bookInfor = this.props.bookEdit
        if (bookInfor && !_.isEmpty(bookInfor)) {
            this.setState({
                id: bookInfor.id,
                quantity: bookInfor.quantity,
                bookTitle: bookInfor.bookTitle,
                genre: bookInfor.genre,
                author: bookInfor.authorName,
                publisher: bookInfor.publisherName,
                sellingPrice: bookInfor.sellingPrice,
                costPrice: bookInfor.costPrice,
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
            'quantity',
            'bookTitle',
            'genre',
            'author',
            'publisher',
            'sellingPrice',
            'costPrice'
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
    handleSaveBook = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editBook(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Book Information</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        {/* <div className='input-container'>
                            <label>Book ID</label>
                            <input
                                type='text'
                                value={this.state.bookId}
                                onChange={(e) => this.handleOnchangeInput(e, 'bookId')}
                            />
                        </div> */}
                        <div className='input-container'>
                            <label>Quantity</label>
                            <input
                                type='text'
                                value={this.state.quantity}
                                onChange={(e) => this.handleOnchangeInput(e, 'quantity')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Book Title</label>
                            <input
                                type='text'
                                value={this.state.bookTitle}
                                onChange={(e) => this.handleOnchangeInput(e, 'bookTitle')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Genre</label>
                            <div className='select-genre'>
                                <select
                                    className='form-select'
                                    value={this.state.genre}
                                    onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                >
                                    <option value={'Action and Adventure'}>Action and Adventure</option>
                                    <option value={"Classics"}>Classics</option>
                                    <option value={"Detective and Mystery"}>Detective and Mystery</option>
                                    <option value={"Fantasy"}>Fantasy</option>
                                </select>
                                <button class="btn btn-primary" type="button">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <input
                                    className='d-none'
                                    value={this.state.genre}
                                    onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                />
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>Author</label>
                            <input
                                type='text'
                                value={this.state.author}
                                onChange={(e) => this.handleOnchangeInput(e, 'author')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Publisher</label>
                            <input
                                type='text'
                                value={this.state.publisher}
                                onChange={(e) => this.handleOnchangeInput(e, 'publisher')}
                            />
                        </div>
                        <div className='input-container '>
                            <label>Selling Price</label>
                            <input
                                type='text'
                                value={this.state.sellingPrice}
                                onChange={(e) => this.handleOnchangeInput(e, 'sellingPrice')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Cost Price</label>
                            <input
                                type='text'
                                value={this.state.costPrice}
                                onChange={(e) => this.handleOnchangeInput(e, 'costPrice')}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleSaveBook()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBook);
