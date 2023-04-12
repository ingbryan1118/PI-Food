import {applyMiddleware, createStore} from 'redux';
import reducer  from './reducer';
import thunk from 'redux-thunk'; //middleware

const store = createStore(reducer, applyMiddleware(thunk)) // acciones con promesas

export default store;