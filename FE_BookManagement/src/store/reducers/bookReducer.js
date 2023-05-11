import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    books: [],
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BOOKS_SUCCESS:
            state.books = action.books;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BOOKS_FAILED:
            state.books = [];
            return {
                ...state
            }
        default:
            return state
    }
}

export default bookReducer;