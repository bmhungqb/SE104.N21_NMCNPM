import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from './adminReducer';
import bookReducer from './bookReducer';
import supplierReducer from './supplierReducer';
import customerReducer from './customerReducer'
import usersReducer from '../reducers/usersReducer';
import discountReducer from './discountReducer';
import regulationReducer from './regulationReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfor']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
    book: bookReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    users: usersReducer,
    discount: discountReducer,
    regulation: regulationReducer
})