import { useState ,useCallback ,useEffect,useRef} from 'react'

import './App.css'

function App() {
const [length,setLength]=useState(8)
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed,setCharAllowed]=useState(false);
const [password,setPassword]=useState('')
const passwordref=useRef(null);
const generatePassword=useCallback(()=>{
  let pass=''
  let str="ABCDEFGHIJKLMNIPQRSTUVWZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed)str+="0123456789"
  if(charAllowed)str+="!@#$^&*()_+"
  for(let i=1;i<length;i++){
    const char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,charAllowed,numberAllowed])


useEffect(()=>{
generatePassword()
},[length,charAllowed,numberAllowed])
const copyPasswordToClipboard=()=>{
  window.navigator.clipboard.writeText(password)
  passwordref.current?.select()
}

  return (
    <div className='w-full max-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-8'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3'  placeholder='password'readOnly  ref={passwordref}  />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'onClick={copyPasswordToClipboard} >copy</button>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='range'
         min={8}
        max={100}
        className='cursor-pointer'
        value={length}
        onChange={(e)=>setLength(e.target.value)}
        name=''
        id=''
       />
        <label htmlFor='length'>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}
         name=""
          id="" />
        <label htmlFor='numbers'>Numbers{numberAllowed}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
         name=""
          id="" />
        <label htmlFor='charInput'>Character{charAllowed}</label>
      </div>
    </div>
  )
}


export default App
