import React from 'react'
import { ACTION } from '../App'
export default function Operation({dispatch,operation}) {
  return (
    <button className='f-32' onClick={()=>{dispatch({type:ACTION.CHOOSE_OPTION,payload:{operation}})}} >{operation}</button>
  )
}
