import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function PrivateRoute(props) {
  const route = useNavigate()
  const {Component} = props
  useEffect(()=>{
    
  const token = localStorage.getItem("token")
  if(!token){
    route('/')
  }
  },[route])
  return (
    <div><Component/></div>
  )
}

export default PrivateRoute

