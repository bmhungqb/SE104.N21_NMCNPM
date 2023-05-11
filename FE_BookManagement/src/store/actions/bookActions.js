import actionTypes from './actionTypes';
import {
    createNewBookService,
    getAllBooks,
    editBookService,
    deleteBookService
} from '../../services/bookService'
import { toast } from 'react-toastify';

export const createNewBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed !")
                dispatch(saveBookSuccess());
                dispatch(fetchAllBooksStart());
            } else {
                toast.error("Create a new user error !")
                dispatch(saveBookFailed());
            }
        } catch (e) {
            toast.error("Create a new user error !")
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
                dispatch(fetchAllBooksSuccess(res.books.reverse()));
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
    users: data
})

export const fetchAllBooksFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOKS_FAILED
})
