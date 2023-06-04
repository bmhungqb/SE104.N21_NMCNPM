import actionTypes from './actionTypes';
import {
    createNewBookService,
    getAllBooks,
    editBookService,
    deleteBookService
} from '../../services/bookService'
import { toast } from 'react-toastify';
//BOOK
export const createNewBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new book succeed !")
                dispatch(saveBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error("Create a new book error !")
                dispatch(saveBookFailed());
            }
        } catch (e) {
            toast.error("Create a new book error !")
            dispatch(saveBookFailed());
        }
    }
}

export const saveBookSuccess = () => ({
    type: actionTypes.CREATE_BOOK_SUCCESS
})
export const saveBookFailed = () => ({
    type: actionTypes.CREATE_BOOK_FAILED
})

export const fetchAllBooksStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBooks("ALL");
            if (res && res.errCode === 0) {
                toast.success("Fetch all books succeed")
                dispatch(
                    fetchAllBooksSuccess(res.books.reverse())
                );
            } else {
                toast.error("Fetch all books error")
                dispatch(fetchAllBooksFailed());
            }
        } catch (e) {
            dispatch(fetchAllBooksFailed());
        }
    }
}

export const fetchAllBooksSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOKS_SUCCESS,
    dataBooks: data
})

export const fetchAllBooksFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOKS_FAILED
})

export const editABook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the book succeed !")
                dispatch(editBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error("Update the book error !")
                dispatch(editBookFailed());
            }
        } catch (e) {
            toast.error("Update the book error !")
            dispatch(editBookFailed());
        }
    }
}

export const editBookSuccess = () => ({
    type: actionTypes.EDIT_BOOK_SUCCESS
})

export const editBookFailed = () => ({
    type: actionTypes.EDIT_BOOK_FAILED
})

export const deleteABook = (bookId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBookService(bookId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed !")
                dispatch(deleteBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error("Delete the user error !")
                dispatch(deleteBookFailed());
            }
        } catch (e) {
            toast.error("Delete the user error !")
            dispatch(deleteBookFailed());
        }
    }
}

export const deleteBookSuccess = () => ({
    type: actionTypes.DELETE_BOOK_SUCCESS
})

export const deleteBookFailed = () => ({
    type: actionTypes.DELETE_BOOK_FAILED
})