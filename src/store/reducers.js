import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  FETCH_USERLIST_REQUEST,
  FETCH_USERLIST_SUCCESS
} from './actions';

const initUser = {
  data: {
    isLoggedIn: false,
    name: '',
    email: '',
    userList: []
  },
  error: null,
  isFetching: false
};

const user = (state = initUser, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return Object.assign({}, state, { isFetching: true });
    }
    case LOGIN_FAILURE: {
      return Object.assign({}, state, { isFetching: false, error: action.error, data: {} });
    }
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, { isFetching: false, error: null, data: action.payload });
    }
    case LOGOUT_REQUEST: {
      return Object.assign({}, state, { isFetching: true, error: null, data: {} });
    }
    case LOGOUT_SUCCESS: {
      return Object.assign({}, state, { isFetching: false, error: null, data: action.payload });
    }
    case FETCH_USERLIST_REQUEST: {
      return Object.assign({}, state, { isFetching: false, error: null, data: {...state.data, userList: []} });
    }
    case FETCH_USERLIST_SUCCESS: {
      return Object.assign({}, state, { 
        isFetching: false, error: null, 
        data: {...state.data, userList: action.payload } 
      });
    }
    default:
      return state;
  }
};

export default user;