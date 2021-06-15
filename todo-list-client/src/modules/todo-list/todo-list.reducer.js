import axios from 'axios';
import beautify from 'vkbeautify'

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

export const ACTION_TYPES = {
    FETCH_TODOLISTS: 'todoList/FETCH_TODOLISTS',
    FETCH_TODOLISTSCOMPLETED: 'todoList/FETCH_TODOLISTCOMPLETED',
    FETCH_TODOLIST:  'todoList/FETCH_TODOLIST',
    CREATE_TODOLIST: 'todoList/CREATE_TODOLIST',
    UPDATE_TODOLIST: 'todoList/UPDATE_TODOLIST',
    DELETE_TODOLIST: 'todoList/DELETE_TODOLIST'
};

const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    segments: [],
    entity: {},
    updating: false,
    updateSuccess: false,
    schema: null,
    parsedMessage: null
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_TODOLISTS):
        case REQUEST(ACTION_TYPES.FETCH_TODOLIST):
        case REQUEST(ACTION_TYPES.FETCH_TODOLISTSCOMPLETED):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true,
                parsedMessage: null,
                schema: null
            };
        case REQUEST(ACTION_TYPES.CREATE_TODOLIST):
        case REQUEST(ACTION_TYPES.UPDATE_TODOLIST):
        case REQUEST(ACTION_TYPES.DELETE_TODOLIST):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true,
                parsedMessage: null
            };
        case REQUEST(ACTION_TYPES.PARSE_TELEX_MESSAGE):
            return {
                ...state,
                errorMessage: null,
                parsedMessage: null
            }
        case FAILURE(ACTION_TYPES.FETCH_TODOLISTS):
        case FAILURE(ACTION_TYPES.FETCH_TODOLISTSCOMPLETED):
        case FAILURE(ACTION_TYPES.FETCH_TODOLIST):
        case FAILURE(ACTION_TYPES.CREATE_TODOLIST):
        case FAILURE(ACTION_TYPES.UPDATE_TODOLIST):
        case FAILURE(ACTION_TYPES.DELETE_TODOLIST):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_TODOLISTS):
            return {
                ...state,
                loading: false,
                entities: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.FETCH_TODOLISTSCOMPLETED):
            return {
                ...state,
                loading: false,
                entities: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.FETCH_TODOLIST):
            return {
                ...state,
                loading: false,
                entity: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_TODOLIST):
        case SUCCESS(ACTION_TYPES.UPDATE_TODOLIST):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_TODOLIST):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: {}
            };
        default:
            return state;
    }
};

const apiUrl = SERVER_API_URL + '/api/todos';
const apiSegmentsUrl = SERVER_API_URL + '/api/segments';
const apiTelexParserUrl = SERVER_API_URL + '/api/telex-parser';

// Actions

export const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_TODOLISTS,
    payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
export const getEntitiesCompleted = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_TODOLISTSCOMPLETED,
    payload: axios.get(`${apiUrl}/completed?cacheBuster=${new Date().getTime()}`)
});

export const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_TODOLIST,
        payload: axios.get(requestUrl)
    };
};

export const createEntity = entity => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_TODOLIST,
        meta: {
            successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.post(apiUrl, entity)
    });
    dispatch(getEntities());
    return result;
};

export const updateEntity = entity => async dispatch => {
	 const requestUrl = `${apiUrl}/${entity.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_TODOLIST,
        meta: {
            successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.put(requestUrl, entity)
    });
    dispatch(getEntities());
    return result;
};

export const deleteEntity = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_TODOLIST,
        meta: {
            successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
            errorMessage: messages.DATA_UPDATE_ERROR_ALERT
        },
        payload: axios.delete(requestUrl)
    });
    dispatch(getEntities());
    return result;
};
