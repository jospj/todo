import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import todoList from '../modules/todo-list/todo-list.reducer'

export default combineReducers({
    todoList,
    loadingBar
});