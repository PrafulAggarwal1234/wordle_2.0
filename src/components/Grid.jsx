import React from "react";
import Row from "./Row";
export default function Grid({guesses,username,turn,currentGuess,flag}){
    return(
        <div className="opponent-grid">
            <h2>{username}</h2>
        {guesses.map((guess,i) => {
            if(i===turn) return <Row key={i} currentGuess={currentGuess} flag={flag}/>
            else return <Row key={i} guess={guess} flag={flag}/>
        })}
        </div>
    )
}