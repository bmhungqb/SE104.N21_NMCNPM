import actionTypes from './actionTypes';
import {
    createNewRegulationService,
    getAllRegulations,
    editRegulationService,
    deleteRegulationService
} from '../../services/regulationService'
import { toast } from 'react-toastify';
//RGULATION
export const createNewRegulation = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewRegulationService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new regulation succeed !")
                dispatch(saveRegulationSuccess());
                dispatch(fetchAllRegulationsStart());
            } else {
                toast.error("Create a new regulation error !")
                dispatch(saveRegulationFailed());
            }
        } catch (e) {
            toast.error("Create a new regulation error !")
            dispatch(saveRegulationFailed());
        }
    }
}

export const saveRegulationSuccess = () => ({
    type: actionTypes.CREATE_REGULATION_SUCCESS
})
export const saveRegulationFailed = () => ({
    type: actionTypes.CREATE_REGULATION_FAILED
})

export const fetchAllRegulationsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllRegulations("ALL");
            if (res && res.errCode === 0) {
                dispatch(
                    fetchAllRegulationsSuccess(res.regulations.reverse())
                );
            } else {
                dispatch(fetchAllRegulationsFailed());
            }
        } catch (e) {
            dispatch(fetchAllRegulationsFailed());
        }
    }
}

export const fetchAllRegulationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_REGULATIONS_SUCCESS,
    dataRegulations: data
})

export const fetchAllRegulationsFailed = () => ({
    type: actionTypes.FETCH_ALL_REGULATIONS_FAILED
})

export const editARegulation = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editRegulationService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch(editRegulationSuccess());
                dispatch(fetchAllRegulationsStart());
            } else {
                toast.success(res.errMessage)
                dispatch(editRegulationFailed());
            }
        } catch (e) {
            toast.error("There was no response.")
            dispatch(editRegulationFailed());
        }
    }
}

export const editRegulationSuccess = () => ({
    type: actionTypes.EDIT_REGULATION_SUCCESS
})

export const editRegulationFailed = () => ({
    type: actionTypes.EDIT_REGULATION_FAILED
})

export const deleteARegulation = (regulationId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteRegulationService(regulationId);
            if (res && res.errCode === 0) {
                toast.success("Delete the regulation succeed !")
                dispatch(deleteRegulationSuccess());
                dispatch(fetchAllRegulationsStart());
            } else {
                toast.error("Delete the regulation error !")
                dispatch(deleteRegulationFailed());
            }
        } catch (e) {
            toast.error("Delete the regulation error !")
            dispatch(deleteRegulationFailed());
        }
    }
}

export const deleteRegulationSuccess = () => ({
    type: actionTypes.DELETE_REGULATION_SUCCESS
})

export const deleteRegulationFailed = () => ({
    type: actionTypes.DELETE_REGULATION_FAILED
})