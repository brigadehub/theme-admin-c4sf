import 'isomorphic-fetch'
import { createFetch, accept, header, init } from 'http-client'
import getProp from '@f/get-prop'

const fetch = createFetch(
  accept('application/json'),
  header('x-csrf-token', getProp('__brigadehub.csrf', window)), // TODO get token from redux
  header('authorization', `Bearer ${getProp('__brigadehub.user.jwt', window)}`), // TODO get token from redux
  header('content-type', 'application/json'),
  init('credentials', 'same-origin')
)

export default fetch
