import React from "react";
export default function useDidMountEffect(func, deps){
    React.useEffect(()=>{
        if(deps[0] === true){ 
            func() 
        }else{
            return
        }
    },deps)
}