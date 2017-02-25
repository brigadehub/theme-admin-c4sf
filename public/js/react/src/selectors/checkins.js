import getProp from '@f/get-prop'

export const getCheckinsCount = (state) =>
  getProp(`checkins`, state) || {}
