import { createAction } from 'redux-actions'
import fetch from '../utils/fetch'
export const REQUEST_CHECKINS_COUNT = 'REQUEST_CHECKINS_COUNT'
export const REQUEST_CHECKINS_COUNT_ERROR = 'REQUEST_CHECKINS_COUNT_ERROR'
export const RECEIVE_CHECKINS_COUNT = 'RECEIVE_CHECKINS_COUNT'

export const requestCheckinsCount = createAction(REQUEST_CHECKINS_COUNT)
export const requestCheckinsCountError = createAction(REQUEST_CHECKINS_COUNT_ERROR)
export const receiveCheckinsCount = createAction(RECEIVE_CHECKINS_COUNT)

export const fetchCheckinCount = (timeframe) => (dispatch) => {
  let callURL = `/api/models/checkins`
  const payload = { timeframe }
  dispatch(createAction(REQUEST_CHECKINS_COUNT)())
  return fetch(callURL)
    .then(res => {
      if (!res.ok) {
        const error = new Error(`Unable to fetch oauth user data for ${provider}`)
        error.status = res.status
        throw error
      }
      const response = res.json()
      dispatch(createAction(RECEIVE_CHECKINS_COUNT)({
        ...payload,
        response
      }))
      return response
    }).catch((err) => dispatch(createAction(REQUEST_CHECKINS_COUNT_ERROR)(err)))
}
