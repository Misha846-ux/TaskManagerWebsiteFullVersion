import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "./mainBasicStyle.css"
import { router } from './Router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} ></RouterProvider>
  </Provider>
  
)
