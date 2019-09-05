import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import * as firebaseConfig from '../../shared/firebaseConfig';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// async
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);

  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const AuthData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = `${firebaseConfig.API_URL}:signInWithPassword?key=${firebaseConfig.PROJECT_WEB_API_KEY}`;
    if (isSignUp) {
      url = `${firebaseConfig.API_URL}:signUp?key=${firebaseConfig.PROJECT_WEB_API_KEY}`;
    }

    // Get a user token from Firebase
    axios.post(url, AuthData)
      .then(response => {
        // console.log(response);

        // Calculate the expiration date and store in local storage
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));        
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}