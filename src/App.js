import React from 'react'
import Register from './components/Register/Register'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Mainlayout from './components/Layouts/MainLayOut/MainLayOut'
import Authlayout from './components/Layouts/AuthLayOut/AuthLayOut'
import SignIn from './components/SignIn/SignIn'
import { Offline, Online } from "react-detect-offline";
import NotFound from './components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import { RecoilRoot } from 'recoil'

export default function App() {

  let routes = createBrowserRouter([
    {path : '/', element : <Mainlayout/>, children : [
      {index:true, element:<ProtectedRoutes> <Home/> </ProtectedRoutes> },
      {path:'home', element: <ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path:'search', element: <ProtectedRoutes> <Search/> </ProtectedRoutes> },
      {path:'*', element: <NotFound/>}
    ]},
    {path : '/', element : <Authlayout/>, children : [
      {path:'register', element: <Register/>},
      {path:'signin', element: <SignIn/>},

    ]}
  ])


  return (
    <>
<RecoilRoot>
  <RouterProvider router={routes}/>
</RecoilRoot>


  
  
  <ToastContainer theme='colored' autoClose={1000}/>


    <Offline>
      <div className='offline'>You are offline Now!</div>
      </Offline>


      
     
    </>
  )
}