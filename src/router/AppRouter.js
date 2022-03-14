import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
export const AppRouter = () => {
  const dispatch = useDispatch();
  const {checking, uid} = useSelector(state=> state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])
 if(checking){
   return <h5>Espere...</h5>
 }
  return (
    <div>
    <Routes>
      
    <Route  path ="/login"  element ={
      <PublicRoute isLoggedIn={!!uid}>
       <LoginScreen/>
    </PublicRoute>
    } /> 
    <Route  path ="/"  element ={
      <PrivateRoute isLoggedIn={!!uid} >
      <CalendarScreen/>
      </PrivateRoute> }/> 
    <Route />
    </Routes>
    </div>
  )
}
