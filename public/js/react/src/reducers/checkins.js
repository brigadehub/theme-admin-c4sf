import {
  REQUEST_CHECKINS_COUNT,
  REQUEST_CHECKINS_COUNT_ERROR,
  RECEIVE_CHECKINS_COUNT
} from '../actions'
import createApiMiddlewareReducer from './utils/api-reducer'

export default oauth

const checkinsReducer = createApiMiddlewareReducer({
  request: REQUEST_CHECKINS_COUNT,
  failure: REQUEST_CHECKINS_COUNT_ERROR,
  receive: RECEIVE_CHECKINS_COUNT
})

function oauth (state = {}, { type, payload = {} }) {
  if (payload === null) return state
  switch (type) {
    case REQUEST_CHECKINS_COUNT:
    case REQUEST_CHECKINS_COUNT_ERROR:
    case RECEIVE_CHECKINS_COUNT:
      return {
        ...state,
        [payload.checkins_type]: checkinsReducer(state[payload.checkins_type], { type, payload })
      }
    default:
      return state
  }
}
