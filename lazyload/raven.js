import Raven from 'raven-js'

Raven
  .config('https://511cc1db12ba4641928a372bb724cf9e@sentry.io/143196', { environment: process.env.NODE_ENV })
  .install()

export default Raven
