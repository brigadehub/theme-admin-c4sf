export function fetchCheckinCout (slug) {
  return {
    // Types of actions to emit before and after
    types: ['FETCH_CHECKIN_COUNT_REQUEST', 'FETCH_CHECKIN_COUNT_SUCCESS', 'FETCH_CHECKIN_COUNT_FAILURE'],
    // Check the cache (optional):
    shouldCallAPI: (state) => !state.checkinCount[slug],
    // Perform the fetching:
    callAPI: () => window.fetch(`/checkins/${slug}`),
    // Arguments to inject in begin/end actions
    payload: { slug }
  }
}
