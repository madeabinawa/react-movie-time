import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import './index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const container = document.getElementById('root')
const root = createRoot(container)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retryDelay: 4000,
    }
  }
})

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)