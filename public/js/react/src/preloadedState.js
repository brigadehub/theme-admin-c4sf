import getProp from '@f/get-prop'
import setProp from '@f/set-prop'
import { parse } from 'component-querystring'

let preloadedState = {}

// load localstorage into redux

const brigadehub = window.__brigadehub

if (brigadehub.user) {
  preloadedState = setProp('user', preloadedState, {
   jwt: brigadehub.user.jwt
 })
}

// const { oauth } = parse(window.location.search.slice(1))
// if (oauth) {
  // try {
    // let { settings, error: oauthError, provider } = JSON.parse(window.atob(oauth))

    // preloadedState = setProp('application.setup', preloadedState, {
    //   isHidden: false,
    //   type: 'source'
    // })

  // } catch (err) {
    // ignore
  // }
// }

export default preloadedState
