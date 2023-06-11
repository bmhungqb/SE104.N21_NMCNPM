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
                toast.success(res.errMessage)
                dispatch(saveBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.success(res.errMessage)
                dispatch(saveBookFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
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
                dispatch(
                    fetchAllBooksSuccess(res.books.reverse())
                );
            } else {
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
                toast.success(res.errMessage)
                dispatch(editBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error(res.errMessage)
                dispatch(editBookFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
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
                toast.success("Detele the book success")
                dispatch(deleteBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error(res.errMessage)
                dispatch(deleteBookFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
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