import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from './features/user';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'], 
};

const rootReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const persistor = persistStore(store);

export default store;
