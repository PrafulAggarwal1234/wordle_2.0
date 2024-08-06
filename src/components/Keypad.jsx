import React, { useEffect, useState } from 'react'

export default function Keypad({usedKeys,handleClick}){
    const handleClicktemp = (l) =>{
        console.log("clciked",l);
    }
    const [letters,setLetters]=useState(null);
    useEffect(()=>{
        var alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l','Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        setLetters(alphabet)
    },[]);

    return (
        <div className='keypad'>
            {letters && letters.map((l) =>{
                return(
                    <div id={l} key={l} className={usedKeys[l]} onClick={(()=>{handleClick(l)})}>
                        {l}
                    </div>
                )
            })}
             <div  id='Backspace' onClick={(()=>{handleClick("Backspace")})}>
             ⌫
            </div>
        </div>
    )
}