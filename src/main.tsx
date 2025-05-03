/* @refresh reload */
import { render } from 'solid-js/web'

import App from './app.tsx'
import 'npm:normalize.css@^8.0.1'
import './main.css'

render(() => <App />, document.getElementById('root')!)
