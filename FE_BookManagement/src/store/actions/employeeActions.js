import actionTypes from './actionTypes';
import {
    createNewBookService
} from '../../services/bookService'
import { toast } from 'react-toastify';

export const createNewBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed !")
                dispatch(saveBookSuccess());
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