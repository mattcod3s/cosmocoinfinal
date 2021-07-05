import { combineReducers } from 'redux';
import cryptoReducer from './cryptoReducer';
import dropdownReducer from './dropdownReducer';
import authReducer from './authReducer';
export default combineReducers({ cryptoReducer, dropdownReducer, authReducer})