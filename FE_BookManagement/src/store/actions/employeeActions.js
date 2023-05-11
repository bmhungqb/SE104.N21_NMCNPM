import actionTypes from './actionTypes';
import {
    createNewEmployeeService
} from '../../services/employeeService'
import { toast } from 'react-toastify';

export const createNewEmployee = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewEmployeeService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new employee succeed !")
                dispatch(saveEmployeeSuccess());
            } else {
                toast.error("Create a new employee error !")
                dispatch(saveEmployeeFailed());
            }
        } catch (e) {
            toast.error("Create a new employee error !")
            dispatch(saveEmployeeFailed());
        }
    }
}

export const saveEmployeeSuccess = () => ({
    type: actionTypes.CREATE_EMPLOYEE_SUCCESS
})
export const saveEmployeeFailed = () => ({
    type: actionTypes.CREATE_EMPLOYEE_FAILED
})