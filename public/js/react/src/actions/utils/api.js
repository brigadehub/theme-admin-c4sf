/**
 * API middleware
 *
 * Shamelessly pulled from http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * This middleware allows API requests to be defined as synchronous actions.
 * See `./example.js` for an... example.
 */

export default function api ({ dispatch, getState }) {
  return (next) => (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (typeof types !== 'object') {
      throw new TypeError('middleware/api: Expected types to be an object')
    }

    [ 'request', 'receive', 'failure' ].forEach(function (type) {
      if (typeof types[type] !== 'string' || !types[type]) {
        throw new TypeError(`middleware/api: "${type}" type expected`)
      }
    })

    if (typeof callAPI !== 'function') {
      throw new TypeError('middleware/api: Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return Promise.resolve()
    }

    dispatch({
      type: types.request,
      payload
    })

    return callAPI().then(
      response => dispatch({
        type: types.receive,
        payload: {
          ...payload,
          response
        }
      }),
      error => dispatch({
        type: types.failure,
        payload,
        error
      })
    )
  }
}
