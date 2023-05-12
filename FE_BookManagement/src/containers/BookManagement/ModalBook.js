import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalBook.scss"
import { emitter } from '../../utils/emitter';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from "../../store/actions/index"
class ModalBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: undefined,
            bookTitle: '',
            genre: '',
            author: '',
            publisher: '',
            sellingPrice: '',
            costPrice: '',
            errMessage: "",
            isOpenInputGenre: false
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                quantity: "",
                bookTitle: '',
                genre: '',
                author: '',
                publisher: '',
                sellingPrice: '',
                costPrice: ''
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
    handleAddNewBook = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewBook(this.state)
            this.toggle()
        }
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
    }
    toggleInputGenre = () => {
        this.setState({
            isOpenInputGenre: !this.state.isOpenInputGenre
        })
    }
    render() {
        let { isOpenInputGenre } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-book-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new book</ModalHeader>
                <ModalBody>
                    <div className='modal-book-body'>
                        <div
                            className='input-container'
                            style={{ "width": "74%" }}
                        >
                            <label>Book Title</label>
                            <input
                                className='w-100'
                                type='text'
                                value={this.state.bookTitle}
                                onChange={(e) => this.handleOnchangeInput(e, 'bookTitle')}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "24%" }}
                        >
                            <label>Quantity</label>
                            <input
                                className='w-100'
                                type='text'
                                value={this.state.quantity}
                                onChange={(e) => this.handleOnchangeInput(e, 'quantity')}
                            />
                        </div>
                        <div className='input-container d-flex w-100'>
                            <label>Genre</label>
                            <div className='select-genre d-flex'>
                                <select
                                    disabled={this.state.isOpenInputGenre}
                                    className='form-select w-25'
                                    value={this.state.genre}
                                    onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                >
                                    <option value={'Action and Adventure'}>Action and Adventure</option>
                                    <option value={"Classics"}>Classics</option>
                                    <option value={"Detective and Mystery"}>Detective and Mystery</option>
                                    <option value={"Fantasy"}>Fantasy</option>
                                </select>
                                <button
                                    className={this.state.isOpenInputGenre ? "border-0 btn btn-primary ml-2 bg-danger" : "border-0 btn btn-primary ml-2"}
                                    type="button"
                                    onClick={() => { this.toggleInputGenre() }}
                                >
                                    <FontAwesomeIcon icon={this.state.isOpenInputGenre ? faMinus : faPlus} />
                                </button>
                                {
                                    this.state.isOpenInputGenre &&
                                    <input
                                        placeholder='Add new genre..'
                                        className='ml-2'
                                        style={{ "width": "68.5%" }}
                                        value={this.state.genre}
                                        onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                    />
                                }
                            </div>
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Author</label>
                            <input
                                type='text'
                                value={this.state.author}
                                onChange={(e) => this.handleOnchangeInput(e, 'author')}
                            />
                        </div>
                        <div
                            className='input-container'
                            style={{ "width": "49%" }}
                        >
                            <label>Publisher</label>
                            <input
                                type='text'
                                value={this.state.publisher}
                                onChange={(e) => this.handleOnchangeInput(e, 'publisher')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "30%" }}
                        >
                            <label>Selling Price</label>
                            <input
                                type='text'
                                value={this.state.sellingPrice}
                                onChange={(e) => this.handleOnchangeInput(e, 'sellingPrice')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "30%" }}
                        >
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
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-danger' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button
                        style={{ "height": "40px", "width": "150px" }}
                        className='px-5 border-0 bg-primary'
                        onClick={() => this.handleAddNewBook()}
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
        createNewBook: (data) => dispatch(actions.createNewBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);
