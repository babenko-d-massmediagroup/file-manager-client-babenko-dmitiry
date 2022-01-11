import { useEffect } from "react"
import {Navigate, useNavigate} from 'react-router-dom'
export const EnterPage = () => {
  if(!localStorage.getItem('token')){
    return <Navigate to='/login'/>
  }

  //check user in db

  return <Navigate to='/home'/>

  // return <div>Loader</div>
}