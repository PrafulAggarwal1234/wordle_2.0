export default function Row({guess,currentGuess,flag}){
    if(guess){
        return(
            <div className="row past">
                {guess.map((element,i)=>{
                    return flag ? <div key={i} className={element.color}>{element.key}</div> : <div key={i} className={element.color}>..</div>
                })}
            </div>
        )
    }
    if(currentGuess){
        let letters = currentGuess.split(''); //basicly to convert string to array (split all chars and make an aray and return it)
        console.log('letter: ',letters)
        return(
            <div className="row current">
                {letters.map((char,i)=>{
                    return <div key={i} className="filled">{flag ? char : ''}</div>
                })}
                {[...Array(5-letters.length)].map((_,i)=>{
                    return <div key={i}></div>
                })}
            </div>
        )
    }
    return(
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}