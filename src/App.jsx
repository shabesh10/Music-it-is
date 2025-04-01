import React from 'react'
// import NavbarContainer from './components/navbar/NavbarContainer';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App