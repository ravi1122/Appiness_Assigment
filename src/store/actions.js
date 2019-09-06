import db from '../../config/db.json';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const FETCH_USERLIST_REQUEST = 'FETCH_USERLIST_REQUEST';
export const FETCH_USERLIST_SUCCESS = 'FETCH_USERLIST_SUCCESS';
export const FETCH_USERLIST_FAILURE = 'FETCH_USERLIST_FAILURE';

export const login = data => {
    return dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        setTimeout(() => {
            const { email, password } = data;
            const { login } = db;

            if (email === login.username && password === login.password) {
                dispatch({ 
                    type: LOGIN_SUCCESS,
                    payload: { isLoggedIn: true, ...data } 
                });
            } else {
                dispatch({ 
                    type: LOGIN_FAILURE, 
                    error: 'Username and password combination is incorrect.'
                });
            }                        
        }, 3000);
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT_REQUEST });

        setTimeout(() => dispatch({
            type: LOGOUT_SUCCESS,
            payload: {
                isLoggedIn: false,
                name: '',
                email: ''
            }
        }), 3000);
    }
}

export const fetchUsersList = () => {
    return dispatch => {
        dispatch({ type: FETCH_USERLIST_REQUEST });

        setTimeout(() => dispatch({
            type: FETCH_USERLIST_SUCCESS,
            payload: db.user
        }), 3000);
    }
}