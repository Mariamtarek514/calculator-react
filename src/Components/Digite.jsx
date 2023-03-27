import React from 'react'
import { ACTION } from '../App'
export default function Digite({dispatch,digit}) {
  return (
    <button className="f-32" onClick={()=>{dispatch({type:ACTION.ADD_DIGIT,payload:{digit}})}} >{digit}</button>
  )
}
