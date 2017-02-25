
/**
 * Module dependencies.
 */

import { combineReducers } from 'redux'
import checkins from './checkins'
import user from './user'

/**
 * Export combined reducers.
 */

export default combineReducers({
  checkins,
  user
})
