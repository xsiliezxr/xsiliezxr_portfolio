import { createApp } from './configs/app.js'
import { env } from './configs/env.js'

const app = createApp()

app.listen(env.PORT)
