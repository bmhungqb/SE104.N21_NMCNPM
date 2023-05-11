import React, { Component } from 'react';
import { FormattedDateTimeRange, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditBook.scss"
import { emitter } from '../../utils/emitter';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
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
            errMessage: "",
            isAllowEdit: false,
            isOpenInputGenre: false,
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
    handleCancelEdit = () => {
        let bookInfor = this.props.bookEdit
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
            this.toggleEdit();
            this.props.editBook(this.state)
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
    toggleInputGenre = () => {
        this.setState({
            isOpenInputGenre: !this.state.isOpenInputGenre
        })
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
                        <div className='input-container'
                            style={{ "width": "10%" }}
                        >
                            <label>Book ID</label>
                            <input
                                disabled={true}
                                type='text'
                                value={this.state.bookId}
                                onChange={(e) => this.handleOnchangeInput(e, 'bookId')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "50%" }}
                        >
                            <label>Book Title</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.bookTitle}
                                onChange={(e) => this.handleOnchangeInput(e, 'bookTitle')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "35%" }}
                        >
                            <label>Author</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.author}
                                onChange={(e) => this.handleOnchangeInput(e, 'author')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "30%" }}
                        >
                            <label>Publisher</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.publisher}
                                onChange={(e) => this.handleOnchangeInput(e, 'publisher')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "67%" }}
                        >
                            <label>Genre</label>
                            <div className='select-genre d-flex w-100'>
                                <select
                                    style={{ "width": "45%" }}
                                    disabled={!this.state.isAllowEdit || this.state.isOpenInputGenre}
                                    className='form-select'
                                    value={this.state.genre}
                                    onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                >
                                    <option value={'Action and Adventure'}>Action and Adventure</option>
                                    <option value={"Classics"}>Classics</option>
                                    <option value={"Detective and Mystery"}>Detective and Mystery</option>
                                    <option value={"Fantasy"}>Fantasy</option>
                                </select>
                                {
                                    this.state.isAllowEdit &&
                                    <button
                                        className={this.state.isOpenInputGenre ? "border-0 btn btn-primary ml-2 bg-danger" : "border-0 btn btn-primary ml-2"}
                                        type="button"
                                        onClick={() => { this.toggleInputGenre() }}
                                    >
                                        <FontAwesomeIcon icon={this.state.isOpenInputGenre ? faMinus : faPlus} />
                                    </button>
                                }
                                {
                                    this.state.isAllowEdit &&
                                    this.state.isOpenInputGenre &&
                                    <input
                                        placeholder='Add new genre..'
                                        className='ml-2'
                                        style={{ "width": "46%" }}
                                        value={this.state.genre}
                                        onChange={(e) => this.handleOnchangeInput(e, 'genre')}
                                    />
                                }
                            </div>
                        </div>

                        <div className='input-container'
                            style={{ "width": "40%" }}
                        >
                            <label>Selling Price</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.sellingPrice}
                                onChange={(e) => this.handleOnchangeInput(e, 'sellingPrice')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "40%" }}
                        >
                            <label>Cost Price</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.costPrice}
                                onChange={(e) => this.handleOnchangeInput(e, 'costPrice')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "30%" }}
                        >
                            <label>Quantity</label>
                            <input
                                disabled={!this.state.isAllowEdit}
                                type='text'
                                value={this.state.quantity}
                                onChange={(e) => this.handleOnchangeInput(e, 'quantity')}
                            />
                        </div>
                        <div className='input-container'
                            style={{ "width": "30%" }}
                        >
                            <label>Last Update</label>
                            <DatePicker
                                value={new Date()}
                                disabled={true}
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
                            onClick={() => this.handleSaveBook()}
                        >Save</Button>
                    }
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
