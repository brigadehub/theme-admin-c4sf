import { createAction } from 'redux-actions'
import fetch from '../utils/fetch'
export const REQUEST_USER = 'REQUEST_USER'
export const REQUEST_USER_ERROR = 'REQUEST_USER_ERROR'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = createAction(REQUEST_USER)
export const requestUserError = createAction(REQUEST_USER_ERROR)
export const receiveUser = createAction(RECEIVE_USER)

export const fetchUser = (username) => (dispatch) => {
  let callURL = `/api/models/user`
  const payload = { username }
  dispatch(createAction(REQUEST_USER)())
  return fetch(callURL)
    .then(res => {
      if (!res.ok) {
        const error = new Error(`Unable to fetch oauth user data for ${provider}`)
        error.status = res.status
        throw error
      }
      const response = res.json()
      dispatch(createAction(RECEIVE_USER)({
        ...payload,
        response
      }))
      return response
    }).catch((err) => dispatch(createAction(REQUEST_USER_ERROR)(err)))
}
