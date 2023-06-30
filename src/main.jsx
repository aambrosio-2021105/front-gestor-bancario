import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import {  isUserLogged } from './login/helpers/isUserAuthenticated'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className={isUserLogged() ? "main-content": null}>
      <AppRouter />
    </div>
  </BrowserRouter>
)