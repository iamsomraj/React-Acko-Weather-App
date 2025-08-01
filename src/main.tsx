import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '@/App'
import '@/index.css'
import { store } from '@/state/store'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
