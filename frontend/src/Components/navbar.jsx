
import { Save,Play,Sun,Moon } from "lucide-react";
import Button from "./Button.jsx";
import { useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";

const Navbar =()=>{

const mode=useSelector((state)=>state.theme.mode)
const dispatch=useDispatch()


useEffect(() => {
  console.log("New mode:", mode);
}, [mode]);

    return(
    <>
     <div className=" w-full flex justify-between"> 
  <h1 className="text-xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent antialiased">
          DevArena
        </h1>

        <div className="flex gap-3">

             <Button content ={<> 
              {mode==="dark"?<Moon size={18}/>:<Sun size={18}/>}
              
              </>} className="bg-slate-950 text-white cursor-pointer" onClick={() => dispatch(toggleMode())}/>  
            <Button content ={<> <Play size={18} /> <h1>Run</h1> </>} className="bg-slate-950 text-white cursor-pointer"/>
<Button content ={<> <Save size={18} /> <h1>Save</h1>  </>} className="bg-green-600 text-white cursor-pointer"/>
        
            </div>
</div>
</> )
}

export default Navbar;