export default ({ request, receive, failure }, initialState = {}) => (state = initialState, { type, payload, error }) => {
  switch (type) {
    case request:
      return {
        ...state,
        isRequesting: true,
        didRequest: false
      }
    case receive:
      return {
        ...state,
        isRequesting: false,
        didRequest: true,
        data: payload.response
      }
    case failure:
      return {
        ...state,
        isRequesting: false,
        didRequestFail: true,
        didRequest: true,
        error: error && error.message
      }
    default:
      return state
  }
}
