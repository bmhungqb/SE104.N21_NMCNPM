import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './bookManage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { emitter } from '../../utils/emitter';
import {
    createNewBookService,
    getAllBooks,
    editBookService,
    deleteBookService
} from '../../services/bookService'
import Header from '../Header/Header';
import SideBar from '../SideBar/sideBar';
import ModalBook from './ModalBook';
import TableBookManage from './TableBookManage';
import ModalEditBook from './ModalEditBook';
import ModalDeleteBook from './ModalDeleteBook';
class BookManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookDeleteId: undefined,
            bookEdit: {},
            arrBooks: [],
            isOpenModalUser: false,
            isOpenModalEditBook: false,
            isOpenModalDeleteBook: false,
        }
    }
    async componentDidMount() {
        await this.getAllBooksFromReact();
    }
    getAllBooksFromReact = async () => {
        let response = await getAllBooks('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrBooks: response.books
            })
        }
    }
    handleAddNewBook = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleBookEditModal = () => {
        this.setState({
            isOpenModalEditBook: !this.state.isOpenModalEditBook,
        })
    }
    toggleBookDeleteModal = () => {
        this.setState({
            isOpenModalDeleteBook: !this.state.isOpenModalDeleteBook,
        })
    }
    createNewBook = async (data) => {
        try {
            let response = await createNewBookService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllBooksFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }
    getBookEdit = (book) => {
        this.setState({
            bookEdit: book
        })
    }
    getBookDelete = (bookId) => {
        this.setState({
            bookDeleteId: bookId
        })
    }
    deleteBook = async () => {
        try {
            let res = await deleteBookService(this.state.bookDeleteId);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalDeleteBook: false
                })
                await this.getAllBooksFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    editBook = async (book) => {
        try {
            let res = await editBookService(book);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditBook: false
                })
                await this.getAllBooksFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <ModalBook
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewBook={this.createNewBook}
                />
                {
                    this.state.isOpenModalEditBook &&
                    <ModalEditBook
                        isOpen={this.state.isOpenModalEditBook}
                        toggleFromParent={this.toggleBookEditModal}
                        editBook={this.editBook}
                        bookEdit={this.state.bookEdit}
                    />
                }
                {
                    this.state.isOpenModalDeleteBook &&
                    <ModalDeleteBook
                        isOpen={this.state.isOpenModalDeleteBook}
                        toggleFromParent={this.toggleBookDeleteModal}
                        deleteBook={this.deleteBook}
                    />
                }
                <SideBar />
                <div id="page-content-wrapper">
                    <Header />
                    <div className='book-manage-container'>
                        <div className='book-manage-header'>
                            <p className='title-header'>Book Management</p>
                            <p className='infor-header'>Book information of the store</p>
                        </div>
                        <div className='book-manage-content'>
                            <div className='action'>
                                <div class="input-group form-outline w-25">
                                    <input placeholder='Enter search' type="text" className="form-control h-100" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true">Search by</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">By ID</a>
                                            <a class="dropdown-item" href="#">By Author</a>
                                            <a class="dropdown-item" href="#">By Title</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-1 button-add'>
                                    <button
                                        className='btn px-3'
                                        onClick={() => this.handleAddNewBook()}
                                    ><i className="fa fa-plus"></i> Add New Book</button>
                                </div>
                            </div>
                            <div className='datatable'>
                                <TableBookManage
                                    toggleFromParent={this.toggleBookEditModal}
                                    toggleBookDeleteModal={this.toggleBookDeleteModal}
                                    arrBooks={this.state.arrBooks}
                                    getBookEdit={(bookInfor) => this.getBookEdit(bookInfor)}
                                    getBookDelete={(bookId) => this.getBookDelete(bookId)}
                                />
                            </div>

                        </div>
                        <div className='book-manage-footer'></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
