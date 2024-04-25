import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [lengthAllowed, setLengthAllowed] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // used ref hook
  const passwordRef = useRef(null)
  
  

  
  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = 
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]-_"

    for (let i = 1; i <= lengthAllowed; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    
    }
    setPassword(pass)
  }, [lengthAllowed,numberAllowed,charAllowed])

const CopyPassword = useCallback(()=>{
  passwordRef.current?.select()
  // passwordRef.current?.setSelectionRange(0,5)
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(()=>{
    passwordGenerator()
  },[lengthAllowed,numberAllowed,charAllowed])

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md
      rounded-lg px-4 my-10 text-orange-500 bg-gray-700
      ">
      <h1 className="text-white text-center">Password Generator</h1>  
        <div className="flex shadow
         rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
          />

          <button onClick={CopyPassword}
           className="outline-none bg-blue-700 text-white px-3
          py-0.5 shrink-0">copy</button>
         </div>

         <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type = "range"
              min={6}
              max={100}
              value={lengthAllowed}
              className="cursor-pointer"
              onChange={(e)=>{setLengthAllowed(e.target.value)}}
            />
            <label>length: {lengthAllowed}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev) => !prev);
              }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev) => !prev);
              }}
             />
             <label htmlFor="charaterrInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
