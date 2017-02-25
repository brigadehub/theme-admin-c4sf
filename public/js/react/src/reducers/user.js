import {
  REQUEST_USER,
  REQUEST_USER_ERROR,
  RECEIVE_USER
} from '../actions'
import createApiMiddlewareReducer from './utils/api-reducer'

export default user

const checkinsReducer = createApiMiddlewareReducer({
  request: REQUEST_USER,
  failure: REQUEST_USER_ERROR,
  receive: RECEIVE_USER
})

function user (state = {}, { type, payload = {} }) {
  if (payload === null) return state
  switch (type) {
    case REQUEST_USER:
    case REQUEST_USER_ERROR:
    case RECEIVE_USER:
      return {
        ...state,
        [payload.username]: checkinsReducer(state[payload.username], { type, payload })
      }
    default:
      return state
  }
}
