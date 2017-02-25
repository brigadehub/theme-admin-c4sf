import getProp from '@f/get-prop'

export const getUser = (state) =>
  getProp(`user`, state) || {}
