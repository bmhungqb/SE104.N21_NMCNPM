import React, { Component } from 'react';
import { FormattedDateTimeRange, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalEditBook.scss"
import { emitter } from '../../utils/emitter';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-flatpickr';
import * as actions from "../../store/actions/index"
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
class ModalEditBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookId: undefined,
            quantity: '',
            currentQuantity: '',
            bookTitle: '',
            genre: '',
            author: '',
            sellingPrice: '',
            costPrice: '',
            errMessage: "",
            isAllowEdit: false,
            isOpenInputGenre: false,
            inputQuantity: '',
        }
    }
    componentDidMount() {
        let bookInfor;
        this.props.listBooks.forEach(row => {
            if (row.bookId === this.props.bookEditId) {
                bookInfor = row
                return
            }
        });
        if (bookInfor && !_.isEmpty(bookInfor)) {
            this.setState({
                bookId: bookInfor.bookId,
                quantity: bookInfor.stock,
                bookTitle: bookInfor.bookTitle,
                genre: bookInfor.genre,
                author: bookInfor.authorName,
                sellingPrice: bookInfor.sellingPrice,
                costPrice: bookInfor.costPrice,
                currentQuantity: bookInfor.stock
            })
        }
    }
    handleCancelEdit = () => {
        let bookInfor;
        this.props.listBooks.forEach(row => {
            if (row.bookId === this.props.bookEditId) {
                bookInfor = row
                return
            }
        });
        if (bookInfor && !_.isEmpty(bookInfor)) {
            this.setState({
                bookId: bookInfor.bookId,
                quantity: bookInfor.quantity,
                bookTitle: bookInfor.bookTitle,
                genre: bookInfor.genre,
                author: bookInfor.authorName,
                sellingPrice: bookInfor.sellingPrice,
                costPrice: bookInfor.costPrice,
            })
        }
        this.toggleEdit()

    }
    handleSaveBook = (values) => {
        if (!values.edit) {
            this.props.editABook(
                {
                    bookId: this.state.bookId,
                    stock: parseInt(this.state.quantity) + parseInt(this.state.currentQuantity),
                    bookTitle: this.state.bookTitle,
                    genre: this.state.genre,
                    author: this.state.author,
                    costPrice: this.state.costPrice,
                }
            )
        }
        else {
            this.props.editABook(
                {
                    bookId: this.state.bookId,
                    stock: this.state.quantity,
                    bookTitle: this.state.bookTitle,
                    genre: this.state.genre,
                    author: this.state.author,
                    costPrice: this.state.costPrice,
                }
            )
        }
        this.toggle();
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
    // Define input validation
    inputEditSchema = Yup.object().shape({
        costPrice: Yup.string()
            .test("is-valid", "Wrong format!", function (value) {
                if (!value) return true;
                if (isNaN(value)) return false; // Check if it's a valid number
                return true;
            })
            .required("Required!"),
        bookTitle: Yup.string().required("Required!"),
        genre: Yup.string().required("Required!"),
        author: Yup.string().required("Required!"),
    })
    inputSchema = Yup.object().shape({
        quantity: Yup.string()
            .test("is-valid", "Wrong format!", function (value) {
                if (!value) return true;
                if (isNaN(value)) return false; // Check if it's a valid number
                return true;
            })
            .required("Required!"),
    })

    handleChange = (e, values) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        values[e.target.name] = e.target.value
    }
    render() {
        return (
            <Formik
                initialValues={this.props.editAction == "edit" ?
                    {
                        bookTitle: '',
                        genre: '',
                        author: '',
                        costPrice: '',
                        edit: true,
                    }
                    :
                    {
                        edit: false,
                        quantity: undefined
                    }
                }
                validationSchema={this.props.editAction == "edit" ? this.inputEditSchema : this.inputSchema}
                onSubmit={(values) => this.handleSaveBook(values)}
                innerRef={this.formikRef}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => { this.toggle() }}
                        className={'modal-book-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => { this.toggle() }}>
                            {this.props.editAction === 'edit' &&
                                <>
                                    Book Information
                                </>
                            }
                            {this.props.editAction === 'input' &&
                                <>
                                    Add Book
                                </>
                            }
                        </ModalHeader>
                        <ModalBody>
                            {
                                this.props.editAction === 'edit' &&
                                <div className='modal-book-body'>
                                    <div className='input-container'
                                        style={{ "width": "10%" }}
                                    >
                                        <label>Book ID</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.bookId}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "50%" }}
                                    >
                                        <label>Book Title</label>
                                        <input
                                            disabled={!this.state.isAllowEdit}
                                            type='text'
                                            name='bookTitle'
                                            value={this.state.bookTitle}
                                            onBlur={handleBlur}
                                            onChange={(e) => { this.handleChange(e, values) }}
                                        />
                                        {errors.bookTitle &&
                                            touched.bookTitle &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '60px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.bookTitle}</p>
                                        }
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "36.1%" }}
                                    >
                                        <label>Author</label>
                                        <input
                                            disabled={!this.state.isAllowEdit}
                                            type='text'
                                            name='author'
                                            value={this.state.author}
                                            onBlur={handleBlur}
                                            onChange={(e) => { this.handleChange(e, values) }}
                                        />
                                        {
                                            errors.author &&
                                            touched.author &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '60px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.author}</p>
                                        }
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "100%" }}
                                    >
                                        <label>Genre</label>
                                        <div className='select-genre d-flex w-100'>
                                            <select
                                                style={this.state.isOpenInputGenre ? { "display": "none", "width": "49%" } : { "width": "49%" }}
                                                disabled={!this.state.isAllowEdit || this.state.isOpenInputGenre}
                                                className='form-select'
                                                name='genre'
                                                onBlur={handleBlur}
                                                value={this.state.genre}
                                                onChange={(e) => this.handleChange(e, values)}
                                            >
                                                <option value={'Action and Adventure'}>Action and Adventure</option>
                                                <option value={"Classics"}>Classics</option>
                                                <option value={"Detective and Mystery"}>Detective and Mystery</option>
                                                <option value={"Fantasy"}>Fantasy</option>
                                            </select>
                                            {
                                                this.state.isAllowEdit &&
                                                this.state.isOpenInputGenre &&
                                                <input
                                                    placeholder='Add new genre..'
                                                    className=''
                                                    style={{ "width": "49%" }}
                                                    name='genre'
                                                    onBlur={handleBlur}
                                                    value={this.state.genre}
                                                    onChange={(e) => this.handleChange(e, values)}
                                                />
                                            }
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
                                                errors.genre &&
                                                touched.genre &&
                                                <p
                                                    style={{
                                                        'position': 'absolute',
                                                        'margin-top': '32px',
                                                        'margin-left': '2px',
                                                        'color': 'red',
                                                        'font-style': 'italic',
                                                    }}
                                                >{errors.genre}</p>}
                                        </div>
                                    </div>

                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Selling Price</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.sellingPrice}
                                            onChange={(e) => this.handleOnchangeInput(e, 'sellingPrice')}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Cost Price</label>
                                        <input
                                            disabled={!this.state.isAllowEdit}
                                            type='text'
                                            name='costPrice'
                                            value={this.state.costPrice}
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        />
                                        {
                                            errors.costPrice &&
                                            touched.costPrice &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '60px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.costPrice}</p>
                                        }
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Quantity</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.quantity}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Last Update</label>
                                        <DatePicker
                                            value={new Date()}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                this.props.editAction === 'input' &&
                                <div className='modal-book-body'>
                                    <div className='input-container'
                                        style={{ "width": "10%" }}
                                    >
                                        <label>Book ID</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.bookId}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "88%" }}
                                    >
                                        <label>Book Title</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.bookTitle}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Current quantity</label>
                                        <input
                                            disabled={true}
                                            type='text'
                                            value={this.state.currentQuantity}
                                        />
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "49%" }}
                                    >
                                        <label>Input quantity</label>
                                        <input
                                            type='text'
                                            value={values.quantity}
                                            name='quantity'
                                            onBlur={handleBlur}
                                            onChange={(e) => this.handleChange(e, values)}
                                        />
                                        {
                                            errors.quantity &&
                                            touched.quantity &&
                                            <p
                                                style={{
                                                    'position': 'absolute',
                                                    'margin-top': '60px',
                                                    'margin-left': '2px',
                                                    'color': 'red',
                                                    'font-style': 'italic',
                                                }}
                                            >{errors.quantity}</p>
                                        }
                                    </div>
                                    <div className='input-container'
                                        style={{ "width": "100%" }}
                                    >
                                        <label>Constraint description</label>
                                        <textarea
                                            disabled={!this.state.isAllowEdit}
                                            type='text'
                                            value={this.state.constraint}
                                        />
                                    </div>
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>
                            {
                                this.props.editAction === 'edit' &&
                                <Button
                                    style={{ "height": "40px", "width": "150px" }}
                                    className={this.state.isAllowEdit ? 'px-5 border-0 bg-success d-none' : 'px-5 border-0 bg-success'}
                                    onClick={() => { this.toggleEdit() }}
                                >Edit</Button>
                            }
                            {
                                this.props.editAction === 'edit' && this.state.isAllowEdit
                                &&
                                <Button
                                    style={{ "height": "40px", "width": "150px" }}
                                    className='px-5 border-0 bg-danger' onClick={() => { this.handleCancelEdit() }}
                                >Cancel</Button>
                            }
                            {
                                this.props.editAction === 'edit' && this.state.isAllowEdit &&
                                <Button
                                    style={{ "height": "40px", "width": "150px" }}
                                    className='px-5 border-0 bg-primary'
                                    onClick={() => this.handleSaveBook('edit')}
                                >Save</Button>
                            }
                            {
                                this.props.editAction === 'input' &&
                                <>
                                    <Button
                                        style={{ "height": "40px", "width": "150px" }}
                                        className='px-5 border-0 bg-danger' onClick={() => { this.props.toggleFromParent() }}
                                    >Cancel
                                    </Button>
                                    <Button
                                        style={{ "height": "40px", "width": "150px" }}
                                        className='px-5 border-0 bg-primary'
                                        type='submit'
                                        onClick={handleSubmit}
                                    >Add</Button></>
                            }
                        </ModalFooter>
                    </Modal >
                )
                }
            </Formik >
        )
    }

}

const mapStateToProps = state => {
    return {
        listBooks: state.book.listBooks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editABook: (data) => dispatch(actions.editABook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBook);
