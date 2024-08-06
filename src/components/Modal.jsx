

export default function Modal({won,turn,solution,setModalFlag}){
    const togglePopup = () => {
        setModalFlag(false);
      };
    return(
        <div className="modal">
            {won==1 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses :(</p>
                </div>
            )}
            {won==-1 && (
                <div>
                    <h1>Game Over!</h1>
                    {/* <p className="solution">word: {solution}</p> */}
                    <p>Opponent has guessed the correct answer :)</p>
                </div>
            )}
            {won==0 && (
                <div>
                    <h1>Game Over!</h1>
                    <p className="solution">word: {solution}</p>
                    <p>Better Luck next time :)</p>
                </div>
            )}
            <button onClick={togglePopup}>Close</button>
        </div>
    )
}