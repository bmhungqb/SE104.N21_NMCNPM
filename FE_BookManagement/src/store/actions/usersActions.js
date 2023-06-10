import actionTypes from './actionTypes';
import {
    createNewUserService,
    getAllUsers,
    editUserService,
    deleteUserService
} from '../../services/userService'
import { toast } from 'react-toastify';
// CRUD User
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new customer succeed !")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create a new customer error !")
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Create a new customer error !")
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                toast.success("Fetch all customers succeed")
                dispatch(
                    fetchAllUsersSuccess(res.users.reverse())
                );
            } else {
                toast.error("Fetch all customers error")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    dataUsers: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user succeed !")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update the user error !")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error !")
            dispatch(editUserFailed());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed !")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete the user error !")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error !")
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
