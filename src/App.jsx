import {useReducer } from "react";
import Digite from "./Components/Digite";
import Operation from "./Components/Operation";
export const ACTION={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPTION:'choose_option',
  EQUAL:'equal',
  RESET:'reset',
  DEL:'del'
}
function reduce(state,{type,payload}){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(state.overWrite){
        return{
          ...state,
          overWrite:false,
          currentOperand:payload.digit
        }
      }
      if(state.currentOperand==="0"&& payload.digit==="0")return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return{
        ...state,
        currentOperand:`${state.currentOperand ||""}${payload.digit}`
      }
    case ACTION.CHOOSE_OPTION:
      if(state.currentOperand==null && state.previousOperand==null){
        return "";
      }
    if(state.previousOperand==null){
      return{
        ...state,
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null
      }
    }
    // changing operation
    if(state.currentOperand==null){
      return{
        ...state,
        operation:payload.operation
      }
    }
    return{
      ...state,
      operation:payload.operation,
      previousOperand:calc(state),
      currentOperand:null
    }
    case ACTION.EQUAL:
     return{
      ...state,
      overWrite:true,
      currentOperand:calc(state),
      previousOperand:null,
      operation:null
     }
    case ACTION.RESET:
      return{};
    case ACTION.DEL:
      if(state.currentOperand==null) return state;
      if(state.currentOperand.length===1){
        return{
          ...state,
          currentOperand:""
        }
      }
      if(state.overWrite){
        return state;
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    default:
      return state;
  }
}
// function clac
function calc(state){
  const prev=parseFloat(state.previousOperand);
  const current=parseFloat(state.currentOperand);
  if(isNaN(prev) || isNaN(current))return "";
  let result="";
  switch(state.operation){
    case '+':
    result=prev + current;
    break;
    case '-':
    result=prev - current;
    break;
    case '*':
      result=prev * current;
      break;
      case '/':
        result=prev / current;
        break;
      default:
        console.log("error");
        break;
  }
  return result;
}
function App() {
  
  const [{currentOperand,operation ,previousOperand},dispatch]=useReducer(reduce,{});
  let activeHandeler=(element,index)=>{
   let lists=document.querySelectorAll(".themes li");
   lists.forEach((li)=>{
     li.classList.remove('active');
     
   })
   element.classList.add("active");
   switch(index){
    case 1:
      document.body.classList="";
      break;
    case 2:
      document.body.classList="";
      document.body.classList.add("second-theme");
      break;
      case 3:
        document.body.classList="";
        document.body.classList.add("third-theme");
        break;
        default:
          console.log("k");
   }
  }
 
  
  return (
    <div className="calculator">
      <div className="calculator-header">
        <h3>calc</h3>
        <div className="theme">
          <span>THEME</span>
          <ul className="themes">
            <li className="active"  onClick={(e)=>activeHandeler(e.target,1)}></li>
            <li  onClick={(e)=>activeHandeler(e.target,2)}></li>
            <li  onClick={(e)=>activeHandeler(e.target,3)}></li>
          </ul>
        </div>
      </div>
      <div className="calculator-grid">
      <div className="output">
        <div className="previous-output">{previousOperand}{operation }</div>
        <div className="current-output">{currentOperand}</div>
      </div>
    <div className="number">
      <Digite digit="7" dispatch={dispatch}  />
      <Digite digit="8" dispatch={dispatch}  />
      <Digite digit="9" dispatch={dispatch}  />
      <button className="special" onClick={()=>dispatch({type:ACTION.DEL})}>DEL</button>
      <Digite digit="4" dispatch={dispatch}  />
      <Digite digit="5" dispatch={dispatch}  />
      <Digite digit="6" dispatch={dispatch}  />
      <Operation operation="+" dispatch={dispatch} />
      <Digite digit="1" dispatch={dispatch}  />
      <Digite digit="2" dispatch={dispatch}  />
      <Digite digit="3" dispatch={dispatch}  />
      <Operation operation="-" dispatch={dispatch} />
      <Digite digit="." dispatch={dispatch}  />
      <Digite digit="0" dispatch={dispatch}  />
      <Operation operation="/" dispatch={dispatch} />
      <Operation operation="*" dispatch={dispatch} />
      <button className="span-two special"onClick={()=>dispatch({type:ACTION.RESET})}>RESET</button>
      <button className="span-two  equal" onClick={()=>dispatch({type:ACTION.EQUAL})}>=</button>
    </div>
    </div>
    </div>
  );
}

export default App;
