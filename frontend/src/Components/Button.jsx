


const Button=(prop)=>{
return(
<>
              
         <button className={`flex items-center gap-2  px-3 py-2 rounded ${prop.className} cursor-pointer`} 
        onClick={prop.onClick} >
         {prop.content}
</button>
</>
)
}

export default Button;