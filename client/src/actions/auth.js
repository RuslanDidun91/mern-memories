import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signIn = (formData, navigate) => async (dispatch) => {
  try {

    navigate('/');
  } catch (error) {
    console.log(error)
  }
}



export const signUp = (formData, navigate) => async (dispatch) => {

  try {

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}